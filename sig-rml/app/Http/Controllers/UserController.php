<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\services\CrudService;
use App\services\KeycloakService;
use App\Models\User;


class UserController extends Controller
{
    protected $crudService;
    protected $keycloakService;

    public function __construct(CrudService $crudService)
    {
        $this->crudService = $crudService;
        $this->keycloakService = $keycloakService;
    }

    public function index()
    {
        $users = $this->crudService->index(User::class);
        return response()->json($users);
    }

    public function store(Request $request)
    {
        if ($request->has('id') || $request->has('keycloak_id')) {
            $existingUser = User::find($request->id);
            if (!$existingUser) {
                return response()->json(['message' => 'Utilisateur non trouvé'], 404);
            }
            $user = $this->crudService->update(User::class, $request->id, $request->all());
        } else {
            $user = $this->crudService->create(User::class, $request->all());
        }
        return response()->json($user);
    }

    public function show($id)
    {
        $user = $this->crudService->show(User::class, $id);
        return response()->json($user);
    }

    public function destroy($id)
    {
        $this->crudService->destroy(User::class, $id);
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function getUserWithAllRelations($userId)
    {
        $user = User::find($userId);
        $user->load('reservations', 'reports', 'notifications');
        return response()->json($user);
    }

    public function getUserWithReservations($userId)
    {
        $user = User::find($userId);
        $user->load('reservations');
        return response()->json($user);
    }

    public function getUserWithReports($userId)
    {
        $user = User::find($userId);
        $user->load('reports');
        return response()->json($user);
    }

    public function getUserWithNotifications($userId)
    {
        $user = User::find($userId);
        $user->load('notifications');
        return response()->json($user);
    }

    // Requêtes liées à keycloak

    public function getUsers(KeycloakService $keycloakService, Request $request)
    {
        // Optionnel : Pagination
        $max = $request->query('max', 100);
        $offset = $request->query('offset', 0);

        $users = $keycloakService->getAllUsers($max, $offset);

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

    public function getUsersByRole(KeycloakService $keycloakService, Request $request)
    {
        // Optionnel : Pagination
        $max = $request->query('max', 100);
        $offset = $request->query('offset', 0);
        $role = $request->query('role', 'AGENT');

        $users = $keycloakService->getUsersByRole($max, $offset, $role);

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

    public function getGroupIdByName(KeycloakService $keycloakService, Request $request)
    {
        $groupName = $request->query('entite', 'EIES');
        $currentUser = Auth::user();

        if (!$currentUser || empty($currentUser->entite)) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non authentifié ou entité manquante.',
            ], 401);
        }

        $users = User::where('entite', $groupName)
            ->where('preferred_username', '!=', $currentUser->token->preferred_username)
            ->get(['id', 'preferred_username', 'given_name', 'family_name', 'email', 'role', 'entite']);

        if ($users->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Aucun utilisateur trouvé pour le groupe spécifié.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'group' => $groupName,
            'users' => $users,
        ], 200);
    }

}
