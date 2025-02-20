<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Http\Controllers\Auth\KeycloakController;
use App\Http\Controllers\LaboratoryController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ActionLogController;
use App\Http\Controllers\CategoryEquipmentController;

class KeycloakController extends Controller
{

    public function redirectToKeycloakForRegister()
    {
        return Socialite::driver('keycloak')->redirect();
    }

    public function handleKeycloakRegisterCallback()
    {
        try {
            $socialUser = Socialite::driver('keycloak')->stateless()->user();

            if (!$socialUser) {
                return redirect()->route('register.keycloak')->with('error', 'Échec de l\'authentification.');
            }

            // Vérifier si l'utilisateur existe déjà
            $existingUser = User::where('email', $socialUser->email)->first();
            if ($existingUser) {
                return redirect('/login')->with('error', 'Cet utilisateur existe déjà. Veuillez vous connecter.');
            }

            // Stocker les infos dans la session pour la création du compte
            session(['keycloak_user' => [
                'name'  => $socialUser->name ?? $socialUser->nickname,
                'email' => $socialUser->email,
            ]]);

            // Rediriger vers le formulaire d'inscription
            return redirect()->route('register.form');

        } catch (\Exception $e) {
            Log::error('Erreur Keycloak', ['exception' => $e]);
            return redirect()->route('register.keycloak')->with('error', 'Problème d\'authentification.');
        }
    }

    public function showRegistrationForm()
    {
        $socialUser = session('keycloak_user');

        if (!$socialUser) {
            return redirect()->route('register.keycloak');
        }

        return view('auth.register', ['socialUser' => $socialUser]);
    }


    public function registerUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'keycloak_id' => 'nullable|string|unique:users,keycloak_id',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        return redirect('/dashboard')->with('success', 'Compte créé avec succès !');
    }

    // Redirection vers Keycloak
    public function redirectToKeycloak()
    {
        return Socialite::driver('keycloak')->redirect();
    }

    // Callback après authentification
    public function handleKeycloakCallback()
    {
        try {
            $socialUser = Socialite::driver('keycloak')->stateless()->user();

            if (!$socialUser) {
                return response()->json(['error' => 'Utilisateur non trouvé'], 401);
            }

            // Vérifier si l'utilisateur existe dans la base de données
            $user = User::where('email', $socialUser->email)->first();

            if (!$user) {
                return response()->json(['error' => 'Utilisateur introuvable dans la base de données'], 401);
            }

            Auth::login($user);

            // Générer un token d'authentification
            $token = $user->createToken('keycloak_token')->plainTextToken;

            return redirect('/');

            return response()->json([
                'user'  => $user,
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur Keycloak', ['exception' => $e]);

            return response()->json([
                'error' => 'Problème d\'authentification'
            ], 500);
        }
    }

    // Déconnexion de Laravel et de Keycloak
    public function logout()
    {
        Auth::logout();

        $redirectUri = route('landing');

        // Obtenir l'URL de déconnexion de Keycloak
        $logoutUrl = Socialite::driver('keycloak')->getLogoutUrl(
            $redirectUri,
            env('KEYCLOAK_CLIENT_ID'),
            session('keycloak_id_token') // Stocker le token dans la session après login
        );

        // Rediriger vers Keycloak pour finaliser le logout
        return redirect($logoutUrl);
    }
}
