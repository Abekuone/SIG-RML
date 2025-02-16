<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipment;
class EquipmentController extends Controller
{
    protected $equipmentService;

    public function __construct(EquipmentService $equipmentService)
    {
        $this->equipmentService = $equipmentService;
    }

    public function index()
    {
        $equipments = $this->crudService->index(Equipment::class);
        return response()->json($equipments);
    }

    public function store(Request $request)
    {

        if ($request->has('id')) {
            $equipment = $this->crudService->update(Equipment::class, $request->all());
        } else {
            $equipment = $this->crudService->create(Equipment::class, $request->all());
        }
        return response()->json($equipment);
    }

    public function show($id)
    {
        $equipment = $this->crudService->show(Equipment::class, $id);
        return response()->json($equipment);
    }
}
