<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Exception;
use Illuminate\Support\Facades\Log;

class KeycloakApiAuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'username' => 'required|string',
                'email' => 'required|email',
                'firstName' => 'required|string',
                'lastName' => 'required|string',
                'password' => 'required|string|min:6',
            ]);

            // Récupérer le token admin Keycloak
            $keycloakTokenResponse = Http::asForm()->post(env('KEYCLOAK_BASE_URL') . '/realms/master/protocol/openid-connect/token', [
                'grant_type' => 'client_credentials',
                'client_id' => env('KEYCLOAK_CLIENT_ID'),
                'client_secret' => env('KEYCLOAK_CLIENT_SECRET')
            ]);

            if (!$keycloakTokenResponse->successful()) {
                throw new \Exception('Erreur de récupération du token Keycloak');
            }

            $adminToken = $keycloakTokenResponse->json()['access_token'];

            // Création de l'utilisateur sur Keycloak
            try {
                $response = Http::withToken($adminToken)->post(env('KEYCLOAK_BASE_URL') . '/admin/realms/' . env('KEYCLOAK_REALM') . '/users', [
                    "username" => $validated['username'],
                    "email" => $validated['email'],
                    "firstName" => $validated['firstName'],
                    "lastName" => $validated['lastName'],
                    "enabled" => true,
                    "emailVerified" => false,
                    "credentials" => [
                        [
                            "type" => "password",
                            "value" => $validated['password'],
                            "temporary" => false
                        ]
                    ]
                ]);

                if (!$response->successful()) {

                    return $response->json()['errorMessage'];
                }

                return response()->json(["message" => "Utilisateur créé avec succès"]);

            } catch (\Exception $e) {
                return response()->json(["error" => $e->getMessage()], 500);
            }

            return response()->json(["message" => "Utilisateur créé avec succès"]);

        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }
}
