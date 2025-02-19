<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;



Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth/redirect', function () {
    return Socialite::driver('keycloak')->redirect();
});

Route::get('/auth/callback', function (Request $request) {
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
});

Route::get('/home', function () {
    return view('home');
});

Route::get('/auth/logout', function () {

    Auth::logout();

    $redirectUri = route('/home');

    // Obtenir l'URL de déconnexion de Keycloak
    $logoutUrl = Socialite::driver('keycloak')->getLogoutUrl(
        $redirectUri,
        env('KEYCLOAK_CLIENT_ID'),
        session('keycloak_id_token') // Stocker le token dans la session après login
    );

    // Rediriger vers Keycloak pour finaliser le logout
    return redirect($logoutUrl);
});
