<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $crudService;

    public function __construct(CrudService $crudService)
    {
        $this->crudService = $crudService;
    }

    public function index()
    {
        $users = $this->crudService->index(User::class);
        return response()->json($users);
    }

    public function store(Request $request)
    {
        if ($request->has('id')) {
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

}
