<?php

return [
    'base_url'       => env('KEYCLOAK_BASE_URL'),
    'realm'          => env('KEYCLOAK_REALM'),
    'client_id'      => env('KEYCLOAK_CLIENT_ID'),
    'client_secret'  => env('KEYCLOAK_CLIENT_SECRET'),
    'redirect_uri'   => env('KEYCLOAK_REDIRECT_URI'),
    'second_client_secret'  => env('KEYCLOAK_SECOND_CLIENT_SECRET'),
    'second_redirect_uri'   => env('KEYCLOAK_SECOND_CLIENT_ID'),
    'username_claim' => env('KEYCLOAK_USERNAME_CLAIM', 'preferred_username'), // Ou 'email'
    'special_token' => env('SPECIAL_CLIENT_TOKEN'),
];
