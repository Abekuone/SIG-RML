<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipment;
use App\services\CrudService;

class EquipmentController extends Controller
{
    protected $crudService;

    public function __construct(CrudService $crudService)
    {
        $this->crudService = $crudService;
    }

    public function index()
    {
        $equipments = $this->crudService->index(Equipment::class);
        return response()->json($equipments);
    }

    public function store(Request $request)
    {

        if ($request->has('id')) {
            $existingEquipment = Equipment::find($request->id);
            if (!$existingEquipment) {
                return response()->json(['message' => 'Equipement non trouvé'], 404);
            }
            $equipment = $this->crudService->update(Equipment::class, $request->id, $request->all());
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

    public function updateEquipmentQuantity(Request $request, $id)
    {
        $equipment = $this->crudService->update(Equipment::class, $id, $request->all());
        return response()->json($equipment);
    }

    public function destroy($id)
    {
        $this->crudService->destroy(Equipment::class, $id);
        return response()->json(['message' => 'Equipement supprimé avec succès']);
    }

    public function getEquipementWithAllRelations($equipementId)
    {
        $equipement = Equipment::find($equipementId);
        $equipement->load('categoryEquipment', 'documents', 'laboratory', 'reservations');
        return response()->json($equipement);
    }

    public function getEquipementByCategoryEquipmentId($categoryEquipmentId)
    {
        $equipements = Equipment::where('category_equipment_id', $categoryEquipmentId)->get();
        return response()->json($equipements);
    }

    public function getEquipementByLaboratoryId($laboratoryId)
    {
        $equipements = Equipment::where('laboratory_id', $laboratoryId)->get();
        return response()->json($equipements);
    }

}
