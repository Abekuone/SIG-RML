<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\services\CrudService;
use App\services\KeycloakService;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    protected $crudService;

    public function __construct(

        CrudService $crudService
    )
    {
        $this->crudService = $crudService;

    }
    public function Keycloakstore(Request $request, KeycloakService $keycloakService)
    {
        $validated = $request->validate([
            'email'    => 'required|email',
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'enabled' => 'boolean',
            'credentials' => 'required|array',
            'role' => 'required|string'
        ]);

        $userData = [
            'email'    => $validated['email'],
            'firstName' => $validated['firstName'],
            'lastName' => $validated['lastName'],
            'enabled' => $validated['enabled'],
            'credentials' => $validated['credentials'],
            'role' => $validated['role']
        ];

        $username = $this->generateUsername($userData['firstName'], $userData['lastName']);
        $userData['username'] = $username;
        $created = $keycloakService->createUser($userData);

        if ($created) {
            return response()->json(['message' => 'Utilisateur créé avec succès.'], 201);
        }

        return response()->json(['message' => 'Erreur lors de la création de l’utilisateur.'], 500);
    }

    public function getUsersByCurrentGroup(KeycloakService $keycloakService, Request $request)
    {
        $user = Auth::user();
        $entity = $user->token->entite[0];
        $currentEntity = AppHelper::getCurrentEntity($entity, $user->token->sub);
        $groupId = $keycloakService->getGroupByName($currentEntity);
        $users = $keycloakService->getUsersByGroup($groupId);

        $users = array_filter($users, function($u) use ($user) {
            return $u['id'] !== $user->token->sub;
        });

        if ($users !== null) {
            return response()->json([
                'message' => 'Liste des utilisateurs récupérée avec succès.',
                'data' => array_values($users)
            ], 200);
        }

        return response()->json([
            'message' => 'Erreur lors de la récupération des utilisateurs.',
        ], 500);
    }

    public function getUsersBySubGroup(KeycloakService $keycloakService, Request $request)
    {
        $user = Auth::user();
        $entity = $user->token->entite[0];
        $currentEntity = AppHelper::getCurrentEntity($entity, $user->token->sub);
        $groupId = $keycloakService->getGroupByName($currentEntity);
        $subgroups = $keycloakService->getSubGroups($groupId);

        foreach ($subgroups as $subgroup) {
            $subgroupUsers = $keycloakService->getUserByGroupAndRole($subgroup['id'], 'RESPONSABLE');
            $users = array_merge($users, $subgroupUsers);
        }

        if ($users !== null) {
            return response()->json([
                'message' => 'Liste des utilisateurs récupérée avec succès.',
                'data' => $users,
            ], 200);
        }

        return response()->json([
            'message' => 'Erreur lors de la récupération des utilisateurs.',
        ], 500);
    }

    public function Keycloaklogin(Request $request, KeycloakService $keycloakService)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        // Log::info($request->all());

        $tokens = $keycloakService->getAccessTokenWithCredentials($username, $password);
        if ($tokens) {
            $currentTokenParts = explode('.', $tokens['agent_token']['access_token']);
            $currentPayload = json_decode(base64_decode($currentTokenParts[1]), true);

            $userId = $currentPayload['sub'];
            $userData = [
                'preferred_username' => $currentPayload['preferred_username'] ?? '',
                'given_name' => $currentPayload['given_name'] ?? '',
                'family_name' => $currentPayload['family_name'] ?? '',
                'email' => $currentPayload['email'] ?? '',
                'role' => $this->extractPrimaryRole($currentPayload['current_roles'] ?? []),
                'entity_code' => $currentPayload['entity_code'] ?? null,
                'entite' => $currentPayload['entite'][0] ?? null,
            ];

            // Rechercher ou créer l'utilisateur dans la base de données
            $user = User::updateOrCreate(['sub' => $userId], $userData);

            return response()->json($user);
        }

        return response()->json(['message' => 'Authentification échouée'], 401);
    }

    private function extractPrimaryRole(array $roles)
    {
        $ignoredRoles = ['manage-account', 'manage-account-links', 'view-profile'];
        $filteredRoles = array_diff($roles, $ignoredRoles);

        return count($filteredRoles) > 0 ? reset($filteredRoles) : 'UNKNOWN';
    }

    public function Keycloaklogout(Request $request, KeycloakService $keycloakService)
    {
        try {
            $refreshtoken = $request->bearerToken();

            $logoutSuccess = $keycloakService->revokeToken($refreshtoken);

            if (!$logoutSuccess) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token non fourni.'
                ], 400);
            }
            else{
                return response()->json([
                    'status' => 'success',
                    'message' => 'Déconnexion réussie.'
                ], 200);
            }

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue lors de la déconnexion.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    function generateUsername(string $firstName, string $lastName): string
    {
        $cleanFirstName = strtolower(preg_replace('/[^a-zA-Z]/', '', $firstName));
        $cleanLastName = strtolower(preg_replace('/[^a-zA-Z]/', '', $lastName));

        $cleanFirstName = substr($cleanFirstName, 0, 8);
        $cleanLastName = substr($cleanLastName, 0, 8);
        $cleanFirstName = substr($cleanFirstName, 0, 8);
        $cleanLastName = substr($cleanLastName, 0, 8);
        $randomNumber = str_pad(random_int(0, 999), 3, '0', STR_PAD_LEFT);
        $username = $cleanFirstName . '.' . $cleanLastName . $randomNumber;

        return $username;
    }

    public function generate_password($length)
    {
        $chars =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' .
            '0123456789!@#$%&';

        $str = '';
        $max = strlen($chars) - 1;
        $str = '';
        $max = strlen($chars) - 1;

        for ($i = 0; $i < $length; $i++)
            $str .= $chars[random_int(0, $max)];
        for ($i = 0; $i < $length; $i++)
            $str .= $chars[random_int(0, $max)];

        return $str;
    }
}
