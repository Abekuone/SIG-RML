<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class KeycloakController extends Controller
{
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
