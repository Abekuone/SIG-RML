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
        $user = Socialite::driver('keycloak')->user();

        $existingUser = User::where('email', $user->email)->first();

        return redirect()->intended('/welcome');
    }

    // Déconnexion de Laravel et de Keycloak
    public function logout()
    {
        Auth::logout();
        $redirectUri = config('services.keycloak.base_url') . "/realms/" . config('services.keycloak.realm') . "/protocol/openid-connect/logout?redirect_uri=" . urlencode(config('app.url'));

        return redirect($redirectUri);
    }
}
