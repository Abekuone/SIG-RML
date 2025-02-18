<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\services\CrudService;
use App\Models\Notification;

class NotificationController extends Controller
{
    protected $crudService;

    public function __construct(CrudService $crudService)
    {
        $this->crudService = $crudService;
    }

    public function index()
    {
        $notifications = $this->crudService->index(Notification::class);
        return response()->json($notifications);
    }

    public function store(Request $request)
    {
        if ($request->has('id')) {
            $notification = $this->crudService->update(Notification::class, $request->all());
        } else {
            $notification = $this->crudService->create(Notification::class, $request->all());
        }
        return response()->json($notification);
    }

    public function show($id)
    {
        $notification = $this->crudService->show(Notification::class, $id);
        return response()->json($notification);
    }

    public function destroy($id)
    {
        $this->crudService->destroy(Notification::class, $id);
        return response()->json(['message' => 'Notification supprimée avec succès']);
    }

}
