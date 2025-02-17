<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Socialite\Facades\Socialite;
use Stevenmaguire\OAuth2\Client\Provider\Keycloak;
use Laravel\Socialite\Contracts\Factory as SocialiteFactory;
use App\Providers\SocialiteKeycloakServiceProvider;
use Laravel\Socialite\SocialiteServiceProvider;


class AppServiceProvider extends ServiceProvider
{

    public function register(): void
    {
        $this->app->register(SocialiteServiceProvider::class);
        $this->app->register(SocialiteKeycloakServiceProvider::class);
    }

    public function boot()
    {
        Socialite::extend('keycloak', function ($app) {
            $config = config('services.keycloak');

            return Socialite::buildProvider(Keycloak::class, [
                'clientId'                => $config['client_id'],
                'clientSecret'            => $config['client_secret'] ?? '',
                'redirectUri'             => $config['redirect'],
                'urlAuthorize'            => $config['base_url'] . '/realms/' . $config['realm'] . '/protocol/openid-connect/auth',
                'urlAccessToken'          => $config['base_url'] . '/realms/' . $config['realm'] . '/protocol/openid-connect/token',
                'urlResourceOwnerDetails' => $config['base_url'] . '/realms/' . $config['realm'] . '/protocol/openid-connect/userinfo',
            ]);
        });
    }


}
