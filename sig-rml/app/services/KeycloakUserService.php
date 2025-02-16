<?php

namespace App\services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class KeycloakUserService
{
    private $baseUrl;
    private $realm;
    private $clientId;
    private $clientSecret;

    public function __construct()
    {
        $this->baseUrl = env('KEYCLOAK_BASE_URL');
        $this->realm = 'master';
        $this->clientId = 'admin-cli';
        $this->clientSecret = '0ALdBgVaaWyCcIhU5fcuiiawBhEXrUye';
    }

    public function createUser(array $userData)
    {
        try {
            // Obtenir un token d'accès
            $token = $this->getAccessToken();

            // Préparer les données de l'utilisateur
            $userPayload = [
                'username' => $userData['username'],
                'email' => $userData['email'],
                'firstName' => $userData['first_name'] ?? '',
                'lastName' => $userData['last_name'] ?? '',
                'attributes' => [
                    'telephone' => $userData['telephone'] ?? '',
                    "civilite"  => $userData['civilite'] ?? '',
                    "fonction" =>  '',
                    "nationalite" => $userData['nationalite'] ?? '',
                ],
                'enabled' => true,
                'credentials' => [
                    [
                        'type' => 'password',
                        'value' => $userData['password'],
                        'temporary' => false
                    ]
                ]
                // 'clientRoles' => [
                //     'ange-frontend-service' => ['ROLE_PROMOTEUR']
                // ]

            ];

            // Appel API pour créer l'utilisateur
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json'
            ])
                ->post("http://192.168.1.92:9090/admin/realms/ANGE/users", $userPayload);

            // Vérifier la réponse
            if ($response->successful()) {
                // return $response->body();
                $location = $response->header('Location');
                $userId = basename($location);

                $clientId = 'ange-frontend-service'; // ID du client dans Keycloak
                $roleName = 'ROLE_PROMOTEUR';
                if ($userId) {
                //   $this->assignRoleToUser($userId, $clientId, $roleName,$token);
                  return $userId;
                }
            }

            Log::error('Keycloak user creation failed', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            return $response->status();
        } catch (\Exception $e) {
            Log::error('Keycloak user creation error', [
                'message' => $e->getMessage()
            ]);

            return $e->getMessage();
        }
    }
    private function getAccessToken()
    {
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Accept' => 'application/json'
            ])->asForm()
                ->withOptions(['verify' => false])
                ->post("http://192.168.1.92:9090/realms/master/protocol/openid-connect/token", [
                    'grant_type' => 'password',
                    'client_id' => 'admin-cli',
                    'client_secret' => 'B9Tus72XKCuzqLZBUJg2Sx3FLba1XjqM',
                    'username' => 'administrateur',
                    'password' => 'administrateur',
                ]);


            if ($response->successful()) {
                return $response->json('access_token');
            }

            throw new \Exception('Token error: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('Token Exception', ['message' => $e->getMessage()]);
            throw $e;
        }
    }
    private function assignRoleToUser($userId, $clientId, $roleName, $token)
    {
        try {
            $token = $this->getAccessToken();

            // Rechercher le rôle par nom
            $roles = $this->getClientRoles($clientId,$token);
            $role = collect($roles)->firstWhere('name', $roleName);
            return response()->json($role);
            if (!$role) {
                throw new \Exception("Role {$roleName} not found for client {$clientId}");
            }

            // Attribuer le rôle à l'utilisateur
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json'
            ])->post("http://192.168.1.92:9090/admin/realms/{$this->realm}/users/{$userId}/role-mappings/clients/{$clientId}", [
                $role
            ]);

            if ($response->successful()) {
                return true;
            }

            throw new \Exception('Error assigning role: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('Error assigning role', ['message' => $e->getMessage()]);
            return false;
        }
    }

    public function getClientRoles($clientId,$token)
{
    try {


        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Content-Type' => 'application/json'
        ])->get("http://192.168.1.92:9090/admin/realms/ANGE/clients/{$clientId}/roles");

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('Error fetching roles: ' . $response->body());
    } catch (\Exception $e) {
            Log::error('Error fetching roles', ['message' => $e->getMessage()]);
            return [];
        }
    }
}
