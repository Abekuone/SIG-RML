<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\JWK;

class VerifyKeycloakToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Token manquant'], 401);
        }

        try {
            $jwks = file_get_contents(env('KEYCLOAK_BASE_URL').'/realms/'.env('KEYCLOAK_REALM').'/protocol/openid-connect/certs');
            $decoded = JWT::decode($token, JWK::parseKeySet(json_decode($jwks, true)), ['RS256']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token invalide'], 401);
        }

        // L'utilisateur est authentifié, on passe la requête
        return $next($request);
    }
}
