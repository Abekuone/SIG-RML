<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\services\CrudService;
use App\Models\ActionLog;

class ActionLogController extends Controller
{
    protected $crudService;

    public function __construct(CrudService $crudService)
    {
        $this->crudService = $crudService;
    }

    public function index()
    {
        $actionLogs = $this->crudService->index(ActionLog::class);
        return response()->json($actionLogs);
    }

    public function store(Request $request)
    {
        $actionLog = $this->crudService->store(ActionLog::class, $request->all());
        return response()->json($actionLog);
    }

    public function show($id)
    {
        $actionLog = $this->crudService->show(ActionLog::class, $id);
        return response()->json($actionLog);
    }
}
