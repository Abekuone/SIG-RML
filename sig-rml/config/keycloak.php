<?php

return [
    'base_url'       => env('KEYCLOAK_BASE_URL'),
    'realm'          => env('KEYCLOAK_REALM'),
    'client_id'      => env('KEYCLOAK_CLIENT_ID'),
    'client_secret'  => env('KEYCLOAK_CLIENT_SECRET'),
    'redirect_uri'   => env('KEYCLOAK_REDIRECT_URI'),
];
