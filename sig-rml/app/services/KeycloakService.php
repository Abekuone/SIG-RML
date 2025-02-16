<?php

namespace App\services;

use App\helpers\AppHelper;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class KeycloakService
{
    private $client;
    private $baseUrl;
    private $realm;
    private $clientId;
    private $clientSecret;
    private $clientConfigs;

    public function __construct()
    {
        $this->client = new Client();
        $this->baseUrl = config('keycloak.base_url');
        $this->realm = config('keycloak.realm');
        $this->clientId = config('keycloak.client_id');
        $this->clientSecret = config('keycloak.client_secret');

        $this->clientConfigs = [
            'agent' => [
                'client_id' => config('keycloak.client_id'),      // Client ID pour le rôle AGENT
                'client_secret' => config('keycloak.client_secret'),   // Secret pour le client AGENT
                'group' => '/DEIE/EIES',
            ],
            'responsable' => [
                'client_id' => config('keycloak.second_redirect_uri'),      // Client ID pour le rôle RESPONSABLE
                'client_secret' => config('keycloak.second_client_secret'),   // Secret pour le client RESPONSABLE
                'group' => '/DEIE'
            ]
        ];
    }

    public function getAccessToken()
    {
        $url = "{$this->baseUrl}/realms/{$this->realm}/protocol/openid-connect/token";

        try {
            $response = $this->client->post($url, [
                'form_params' => [
                    'grant_type'    => 'password',
                    'client_id'     => $this->clientId,
                    'client_secret' => $this->clientSecret,
                ],
            ]);

            $body = json_decode($response->getBody(), true);
            return $body['access_token'] ?? null;
        } catch (RequestException $e) {
            return null;
        }
    }

    public function getPromoteurToken($username, $password)
    {
        $url = "{$this->baseUrl}/realms/{$this->realm}/protocol/openid-connect/token";

        try {
            $response = $this->client->post($url, [
                'form_params' => [
                    'grant_type'    => 'password',
                    'client_id'     => $this->clientId,
                    'client_secret' => $this->clientSecret,
                    'username'      => $username,
                    'password'      => $password,
                ],
            ]);

            $body = json_decode($response->getBody(), true);
            return $body ?? null; // Renvoie le token d'accès si disponible
        } catch (RequestException $e) {
            Log::error('Erreur d\'authentification Keycloak', ['message' => $e->getMessage()]);
            return null;
        }
    }

    public function getAccessTokenWithCredentials($username, $password)
    {
        $url = "{$this->baseUrl}/realms/{$this->realm}/protocol/openid-connect/token";

        try {
            // Token pour AGENT
            $agentTokenResponse = $this->client->post($url, [
                'form_params' => [
                    'grant_type'    => 'password',
                    'client_id'     => $this->clientConfigs['agent']['client_id'],
                    'client_secret' => $this->clientConfigs['agent']['client_secret'],
                    'username'      => $username,
                    'password'      => $password,
                ],
                'headers' => [
                    'X-Group-Type' => 'parent'  // Paramètre personnalisé pour indiquer qu'on veut le groupe actuel
                ]
            ]);

            // Token pour RESPONSABLE
            $responsableTokenResponse = $this->client->post($url, [
                'form_params' => [
                    'grant_type'    => 'password',
                    'client_id'     => $this->clientConfigs['responsable']['client_id'],
                    'client_secret' => $this->clientConfigs['responsable']['client_secret'],
                    'username'      => $username,
                    'password'      => $password,
                ],
                'headers' => [
                    'X-Group-Type' => 'current'  // Paramètre personnalisé pour indiquer qu'on veut le groupe parent
                ]
            ]);

            $agentToken = json_decode($agentTokenResponse->getBody(), true);
            $responsableToken = json_decode($responsableTokenResponse->getBody(), true);

            return [
                'agent_token' => $agentToken,
                'responsable_token' => $responsableToken
            ];

        } catch (RequestException $e) {
            Log::error('Erreur d\'authentification Keycloak', [
                'message' => $e->getMessage()
            ]);
            return null;
        }
    }
    public function validateToken($accessToken)
    {
        $url = "{$this->baseUrl}/realms/{$this->realm}/protocol/openid-connect/token/introspect";
        try {
            $response = $this->client->post($url, [
                'form_params' => [
                    'client_id'     => $this->clientId,
                    'client_secret' => $this->clientSecret,
                    'token'         => $accessToken,
                ],
            ]);

            $result = json_decode($response->getBody(), true);
            //dd($result);

            if (isset($result['active']) && $result['active'] === true) {
                return $result;
            }

            return false;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function revokeToken($refreshtoken)
    {
        $url = "{$this->baseUrl}/realms/{$this->realm}/protocol/openid-connect/logout";

        foreach ($this->clientConfigs as $config) {
            try {
                $response = $this->client->post($url, [
                    'form_params' => [
                        'client_id'     => $config['client_id'],
                        'client_secret' => $config['client_secret'],
                        'refresh_token' => $refreshtoken,
                    ],
                ]);

                if ($response->getStatusCode() === 204) {
                    Log::info('Token révoqué avec succès.', [
                        'client_id' => $config['client_id'],
                    ]);
                    return true; // Révocation réussie
                }
            } catch (RequestException $e) {
                Log::warning('Échec de la révocation du token.', [
                    'client_id' => $config['client_id'],
                    'message' => $e->getMessage(),
                ]);
            }
        }

        Log::error('Échec de la révocation du token pour tous les clients.');
        return false; // Si aucun client ne réussit
    }

    public function getUserById($userId)
    {
        $cacheKey = "keycloak_user_{$userId}";

        return Cache::remember($cacheKey, 3600, function () use ($userId) {
            $token = $this->getCliAccessToken();

            $response = $this->client->get(
                "{$this->baseUrl}/admin/realms/{$this->realm}/users/{$userId}",
                [
                    'headers' => [
                        'Authorization' => "Bearer {$token}",
                        'Content-Type' => 'application/json',
                    ]
                ]
            );

            $userData = json_decode($response->getBody());

            return [
                'id' => $userData->id,
                'nom' => $userData->lastName,
                'prenom' => $userData->firstName,
                'email' => $userData->email,
                'username' => $userData->username
            ];
        });
    }


    public function getUserInfo($userId)
    {
        $accessToken = $this->getCliAccessToken();

        if (!$accessToken) {
            Log::error("Impossible de récupérer le token d'accès pour Keycloak.");
            return null;
        }

        $url = "{$this->baseUrl}/admin/realms/{$this->realm}/users/{$userId}";

        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            Log::error("Erreur lors de la récupération des informations utilisateur pour l'ID $userId : " . $e->getMessage());
            return null;
        }
    }

    public function getUserDetails($userId)
    {
        $accessToken = $this->getCliAccessToken();

        if (!$accessToken) {
            Log::error("Impossible de récupérer le token d'accès pour Keycloak.");
            return null;
        }

        $url = "{$this->baseUrl}/admin/realms/{$this->realm}/users/{$userId}";

        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            Log::error("Erreur lors de la récupération des détails de l'utilisateur : " . $e->getMessage());
            return null;
        }
    }

    public function getAllUsers($max = 100, $offset = 0)
    {
        $accessToken = $this->getCliAccessToken();

        if (!$accessToken) {
            Log::error("Impossible de récupérer le token d'accès pour Keycloak.");
            return null;
        }

        $url = "{$this->baseUrl}/admin/realms/{$this->realm}/users?max={$max}&first={$offset}";

        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            Log::error("Erreur lors de la récupération des utilisateurs : " . $e->getMessage());
            return null;
        }
    }

    public function getUsersByGroup($groupId, $max = 100, $offset = 0)
    {
        $accessToken = $this->getCliAccessToken();

        if (!$accessToken) {
            Log::error("Impossible de récupérer le token d'accès pour Keycloak.");
            return null;
        }

        $url = "{$this->baseUrl}/admin/realms/{$this->realm}/groups/{$groupId}/members?max={$max}&first={$offset}";

        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            Log::error("Erreur lors de la récupération des utilisateurs du groupe {$groupId} : " . $e->getMessage());
            return null;
        }
    }

    public function getUsersByRole($max = 100, $offset = 0, $role)
    {
        $accessToken = $this->getCliAccessToken();

        if (!$accessToken) {
            Log::error("Impossible de récupérer le token d'accès pour Keycloak.");
            return null;
        }

        $url = "{$this->baseUrl}/admin/realms/{$this->realm}/roles/{$role}/users?max={$max}&first={$offset}";

        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            Log::error("Erreur lors de la récupération des utilisateurs : " . $e->getMessage());
            return null;
        }
    }

    public function getUsersByRoleAndSubGroups($role, $groupPath, $max = 100, $offset = 0)
    {
        $user = Auth::user();
        $userRoles = $user->token->current_roles ?? [];
        $entity_code = $user->token->entity_code;
        $currentRole = AppHelper::getCurrentRole($userRoles);

        $accessToken = $this->getCliAccessToken();

        if (!$accessToken) {
            Log::error("Impossible de récupérer le token d'accès pour Keycloak.");
            return [];
        }

        // Étape 1 : Récupérer les sous-groupes récursivement
        $subgroups = $this->getSubGroupsRecursively($groupPath);
        $filteredUsers = [];

        foreach ($subgroups as $group) {
            $users = $this->getUsersByGroup($group['id']);
            foreach ($users as $user) {
                if($currentRole === 'RESPONSABLE' && $entity_code == 3){
                    $userRoles =$this->getUserInfo($user['id']);
                    if (isset($userRoles['attributes']['AGENT_ATTRIBUTE'])) {
                        continue;
                    }else{
                        $filteredUsers[] = $user;
                    }
                }else{
                    $filteredUsers[] = $user;
                }
            }
        }


        return $filteredUsers;
    }


    public function getAllGroupsWithSubgroups()
    {
        $accessToken = $this->getCliAccessToken();

        if (!$accessToken) {
            Log::error("Impossible de récupérer le token d'accès pour Keycloak.");
            return null;
        }

        $url = "{$this->baseUrl}/admin/realms/{$this->realm}/groups";

        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                ],
            ]);

            $groups = json_decode($response->getBody(), true);

            // Appel récursif pour récupérer les sous-groupes
            foreach ($groups as &$group) {
                $group['subGroups'] = $this->getSubGroupsRecursively($group['id']);
            }

            return $groups;

        } catch (RequestException $e) {
            Log::error("Erreur lors de la récupération des groupes : " . $e->getMessage());
            return null;
        }
    }

    private function getSubGroupsRecursively($groupId)
    {
        $accessToken = $this->getCliAccessToken();

        if (!$accessToken) {
            Log::error("Impossible de récupérer le token d'accès pour Keycloak.");
            return [];
        }

        $url = "{$this->baseUrl}/admin/realms/{$this->realm}/groups/{$groupId}/children";

        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                ],
            ]);

            $subGroups = json_decode($response->getBody(), true);

            // Récursivité pour explorer les sous-groupes de chaque sous-groupe
            foreach ($subGroups as &$subGroup) {
                $subGroup['subGroups'] = $this->getSubGroupsRecursively($subGroup['id']);
            }

            return $subGroups;

        } catch (RequestException $e) {
            Log::error("Erreur lors de la récupération des sous-groupes : " . $e->getMessage());
            return [];
        }
    }



    public function getEntities($max = 100, $offset = 0)
    {
        $accessToken = $this->getCliAccessToken();

        if (!$accessToken) {
            Log::error("Impossible de récupérer le token d'accès pour Keycloak.");
            return null;
        }

        $url = "{$this->baseUrl}/admin/realms/{$this->realm}/groups?max={$max}&first={$offset}";

        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            Log::error("Erreur lors de la récupération des utilisateurs : " . $e->getMessage());
            return null;
        }
    }


    public function createUser($userData)
    {
        $accessToken = $this->getCliAccessToken();
        $roleName = $userData['role'];
        unset($userData['role']);

        if (!$accessToken) {
            return null;
        }

        $url = "{$this->baseUrl}/admin/realms/{$this->realm}/users";
        try {
            $response = $this->client->post($url, [
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                    'Content-Type'  => 'application/json',
                ],
                'json' => $userData,
            ]);

            if ($response->getStatusCode() == 201) {
                $locationHeader = $response->getHeader('Location')[0];
                $userId = basename($locationHeader);
                $this->assignRoleToUser($userId, $roleName);
                return response()->json(['message' => 'Utilisateur créé avec succès dans Keycloak.'], 201);
            }

            return response()->json(['message' => 'Échec de la création de l\'utilisateur.'], 400);

        } catch (RequestException $e) {
            return false;
        }
    }

    public function getActiveUser($token)
    {
        try {
            $url = "{$this->baseUrl}/realms/{$this->realm}/protocol/openid-connect/userinfo";

            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => "Bearer {$token}",
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            return null;
        }
    }

    public function getUserRealmRoles($userId)
    {
        $accessToken = $this->getCliAccessToken();

        if (!$accessToken) {
            Log::error("Impossible de récupérer le token d'accès pour Keycloak.");
            return null;
        }
        // Correction de l'URL pour inclure /auth/admin/
        $url = "{$this->baseUrl}/admin/realms/{$this->realm}/users/{$userId}/role-mappings";
        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            dd($e);
            Log::error("URL tentée : " . $url);
            return null;
        }
    }
    public function getUserRealmGroups($userId)
    {
        $accessToken = $this->getCliAccessToken();

        if (!$accessToken) {
            Log::error("Impossible de récupérer le token d'accès pour Keycloak.");
            return null;
        }
        // Correction de l'URL pour inclure /auth/admin/
        $url = "{$this->baseUrl}/admin/realms/{$this->realm}/users/{$userId}/groups";
        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            dd($e);
            Log::error("URL tentée : " . $url);
            return null;
        }
    }
    private function getCliAccessToken()
    {
        try {
            $url = "{$this->baseUrl}/realms/{$this->realm}/protocol/openid-connect/token";

            $response = Http::withHeaders([
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Accept' => 'application/json'
            ])->asForm()
                ->withOptions(['verify' => false])
                ->post($url, [
                    'grant_type' => 'password',
                    'client_id' => 'admin-cli',
                    'client_secret' => 'SMQsFvVMT6FEmwachAeF1MROu6jSXEcG',
                    'username' => 'admin',
                    'password' => 'admin',
                ]);

            if ($response->successful()) {
                return $response->json('access_token');
            }

            throw new \Exception('Token error: ' . $response->body());
        } catch (\Exception $e) {
            throw $e;
        }
    }

    private function getRoleId($roleName)
    {
        $rolesUrl = "{$this->baseUrl}/admin/realms/{$this->realm}/roles/{$roleName}";

        try {
            $response = $this->client->get($rolesUrl, [
                'headers' => [
                    'Authorization' => "Bearer {$this->getCliAccessToken()}",
                ]
            ]);

            $role = json_decode($response->getBody(), true);
            return $role['id'];
        } catch (RequestException $e) {
            return null;
        }
    }

    private function assignRoleToUser($userId, $roleName)
    {
        $roleId = $this->getRoleId($roleName);

        if ($roleId) {
            $roleAssignUrl = "{$this->baseUrl}/admin/realms/{$this->realm}/users/{$userId}/role-mappings/realm";

            $this->client->post($roleAssignUrl, [
                'headers' => [
                    'Authorization' => "Bearer {$this->getCliAccessToken()}",
                    'Content-Type'  => 'application/json',
                ],
                'json' => [[
                    'id' => $roleId,
                    'name' => $roleName
                ]]
            ]);
        }
    }
}
