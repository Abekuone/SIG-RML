<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\services\CrudService;
use App\Models\CategoryEquipment;

class CategoryEquipmentController extends Controller
{
    protected $crudService;

    public function __construct(CrudService $crudService)
    {
        $this->crudService = $crudService;
    }

    public function index()
    {
        $categoryEquipments = $this->crudService->index(CategoryEquipment::class);
        return response()->json($categoryEquipments);
    }

    public function store(Request $request)
    {
        if ($request->has('id')) {
            $existingCategoryEquipment = CategoryEquipment::find($request->id);
            if (!$existingCategoryEquipment) {
                return response()->json(['message' => 'Categorie d\'equipement non trouvée'], 404);
            }
            $categoryEquipment = $this->crudService->update(CategoryEquipment::class, $request->id, $request->all());
        } else {
            $categoryEquipment = $this->crudService->create(CategoryEquipment::class, $request->all());
        }
        return response()->json($categoryEquipment);
    }

    public function show($id)
    {
        $categoryEquipment = $this->crudService->show(CategoryEquipment::class, $id);
        return response()->json($categoryEquipment);
    }

    public function destroy($id)
    {
        $this->crudService->destroy(CategoryEquipment::class, $id);
        return response()->json(['message' => 'Category equipment deleted successfully']);
    }

    public function getCategoryEquipmentByLaboratory($laboratoryId)
    {
        $categoryEquipments = CategoryEquipment::where('laboratory_id', $laboratoryId)->get();
        return response()->json($categoryEquipments);
    }

    public function getEquipementsOfCategoryEquipment($categoryEquipmentId)
    {
        $equipements = Equipment::where('category_equipment_id', $categoryEquipmentId)->get();
        return response()->json($equipements);
    }

    public function getCategoryEquipmentWithEquipements($categoryEquipmentId)
    {
        $categoryEquipment = CategoryEquipment::find($categoryEquipmentId);
        $equipements = $categoryEquipment->equipements;
        return response()->json($categoryEquipment);
    }

    public function getCategoryEquipmentWithAllRelations($categoryEquipmentId)
    {
        $categoryEquipment = CategoryEquipment::find($categoryEquipmentId);
        $equipements = $categoryEquipment->equipements;
        return response()->json($categoryEquipment);
    }

}
