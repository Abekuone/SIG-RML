<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Laboratory;
use App\services\CrudService;

class LaboratoryController extends Controller
{
    public function __construct(CrudService $crudService)
    {
        $this->crudService = $crudService;
    }

    public function index()
    {
        $laboratories = $this->crudService->index(Laboratory::class);
        return response()->json($laboratories);
    }

    public function store(Request $request)
    {
        if ($request->has('id')) {
            $laboratory = $this->crudService->update(Laboratory::class, $request->all());
        } else {
            $laboratory = $this->crudService->create(Laboratory::class, $request->all());
        }
        return response()->json($laboratory);
    }

    public function show($id)
    {
        $laboratory = $this->crudService->show(Laboratory::class, $id);
        return response()->json($laboratory);
    }

    public function destroy($id)
    {
        $laboratory = $this->crudService->destroy(Laboratory::class, $id);
        return response()->json($laboratory);
    }


}
