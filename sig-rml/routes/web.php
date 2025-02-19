<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth/redirect', function () {
    // dd('test socialite', config('services.keycloak'));
    return Socialite::driver('keycloak')->redirect();
});

Route::get('/auth/callback', function () {
    try {
        $user = Socialite::driver('keycloak')->stateless()->user();
        dd($user);
    } catch (\Exception $e) {
        Log::error('Erreur Keycloak', ['exception' => $e]);
        dd($e);
    }
});

Route::get('/home', function () {
    return view('home');
});

Route::get('/auth/logout', function () {

        Auth::logout();

        return redirect(Socialite::driver('keycloak')->getLogoutUrl());

        $redirectUri = route('/');

        return redirect(Socialite::driver('keycloak')->getLogoutUrl($redirectUri, env('KEYCLOAK_CLIENT_ID')));
        return redirect(Socialite::driver('keycloak')->getLogoutUrl($redirectUri, null, 'YOUR_ID_TOKEN_HINT'));
        return redirect(Socialite::driver('keycloak')->getLogoutUrl($redirectUri, env('KEYCLOAK_CLIENT_ID'), 'YOUR_ID_TOKEN_HINT'));

        return redirect(Socialite::driver('keycloak')->getLogoutUrl($redirectUri, CLIENT_ID, null, ['state' => '...'], ['ui_locales' => 'de-DE']));

        return redirect(Socialite::driver('keycloak')->getLogoutUrl($redirectUri));
});

