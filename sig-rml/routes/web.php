<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth/redirect', function () {
    dd('test socialite', config('services.keycloak'));
    return Socialite::driver('keycloak')->redirect();
});

Route::get('/auth/callback', function () {
    $user = Socialite::driver('keycloak')->user();

    dd($user);
});
