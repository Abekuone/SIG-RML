<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Exception;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\services\KeycloakService;

class KeycloakApiAuthController extends Controller
{

    protected $userController;
    protected $keycloakService;

    public function __construct(
        KeycloakService $keycloakService,
    )
    {
        $this->KeycloakService = $keycloakService;
    }

    public function keycloakRegister(Request $request, KeycloakService $keycloakService)
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
                    "username" => $this->generateUsername($validated['firstName'], $validated['lastName']),
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

    public function redirectToKeycloakForLogin()
    {
        return Socialite::driver('keycloak')->redirect();
    }

    // Callback après authentification
    public function handleKeycloakCallbackForLogin()
    {
        try {
            $socialUser = Socialite::driver('keycloak')->stateless()->user();

            if (!$socialUser) {
                return response()->json(['error' => 'Utilisateur non trouvé'], 401);
            }

            // Vérifier si l'utilisateur existe dans la base de données
            $user = User::where('email', $socialUser->email)->first();

            if (!$user) {
                return response()->json(['error' => 'Utilisateur introuvable dans la base de données'], 401);
            }

            Auth::login($user);

            // Générer un token d'authentification
            $token = $user->createToken('keycloak_token')->plainTextToken;

            return redirect('/');

            return response()->json([
                'user'  => $user,
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur Keycloak', ['exception' => $e]);

            return response()->json([
                'error' => 'Problème d\'authentification'
            ], 500);
        }
    }

    public function storeTokens($userId, $accessToken, $refreshToken, $expiresIn, $refreshExpiresIn)
    {
        UserToken::updateOrCreate(
            ['user_id' => $userId],
            [
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
                'expires_at' => now()->addSeconds($expiresIn),
                'refresh_expires_at' => now()->addSeconds($refreshExpiresIn),
            ]
        );
    }

    public function keycloakLogout(Request $request, KeycloakService $keycloakService)
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
                Auth::logout();
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

        // Nettoyer les entrées (supprimer les caractères spéciaux et mettre en minuscules)
        $cleanFirstName = strtolower(preg_replace('/[^a-zA-Z]/', '', $firstName));
        $cleanLastName = strtolower(preg_replace('/[^a-zA-Z]/', '', $lastName));

        // Limiter la longueur des noms pour éviter des noms d'utilisateur trop longs
        $cleanFirstName = substr($cleanFirstName, 0, 8); // Maximum 8 caractères pour le prénom
        $cleanLastName = substr($cleanLastName, 0, 8);   // Maximum 8 caractères pour le nom
        $randomNumber = str_pad(random_int(0, 999), 3, '0', STR_PAD_LEFT);
        // Combiner les éléments pour créer le nom d'utilisateur
        $username = $cleanFirstName . '.' . $cleanLastName . $randomNumber;
        // Limiter la longueur des noms pour éviter des noms d'utilisateur trop longs
        $cleanFirstName = substr($cleanFirstName, 0, 8); // Maximum 8 caractères pour le prénom
        $cleanLastName = substr($cleanLastName, 0, 8);   // Maximum 8 caractères pour le nom
        $randomNumber = str_pad(random_int(0, 999), 3, '0', STR_PAD_LEFT);
        // Combiner les éléments pour créer le nom d'utilisateur
        $username = $cleanFirstName . '.' . $cleanLastName . $randomNumber;

        return $username;
    }
}
