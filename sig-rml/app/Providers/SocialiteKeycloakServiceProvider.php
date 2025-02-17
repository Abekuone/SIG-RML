<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Socialite\Contracts\Factory as SocialiteFactory;
use Laravel\Socialite\Facades\Socialite;
use Stevenmaguire\OAuth2\Client\Provider\Keycloak;

class SocialiteKeycloakServiceProvider extends ServiceProvider
{

    public function register(): void
    {
        $this->app->make(SocialiteFactory::class)->extend('keycloak', function ($app) {
            $config = config('services.keycloak');

            return \Socialite::buildProvider(Keycloak::class, [
                'clientId'          => $config['client_id'],
                'clientSecret'      => $config['client_secret'],
                'redirectUri'       => $config['redirect'],
                'urlAuthorize'      => $config['base_url'] . '/realms/' . $config['realm'] . '/protocol/openid-connect/auth',
                'urlAccessToken'    => $config['base_url'] . '/realms/' . $config['realm'] . '/protocol/openid-connect/token',
                'urlResourceOwnerDetails' => $config['base_url'] . '/realms/' . $config['realm'] . '/protocol/openid-connect/userinfo',
            ]);
        });

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
