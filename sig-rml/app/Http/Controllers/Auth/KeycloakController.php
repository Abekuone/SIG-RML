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
    public function redirectToProvider()
    {
        return Socialite::driver('keycloak')->redirect();
    }

    // Callback après authentification
    public function handleProviderCallback()
    {
        $user = Socialite::driver('keycloak')->user();

        // Recherchez ou créez l'utilisateur en base
        $authUser = User::updateOrCreate([
            'email' => $user->getEmail(),
        ], [
            'name' => $user->getName(),
            'password' => bcrypt(str()->random(32)), // Générer un mot de passe sécurisé
        ]);

        // Connecter l'utilisateur
        Auth::login($authUser);

        return redirect('/home'); // Rediriger après connexion
    }

    // Déconnexion de Laravel et de Keycloak
    public function logout()
    {
        Auth::logout();
        $redirectUri = config('services.keycloak.base_url') . "/realms/" . config('services.keycloak.realm') . "/protocol/openid-connect/logout?redirect_uri=" . urlencode(config('app.url'));

        return redirect($redirectUri);
    }
}
