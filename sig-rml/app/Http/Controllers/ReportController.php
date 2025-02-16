<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;

class ReportController extends Controller
{
    protected $crudService;

    public function __construct(CrudService $crudService)
    {
        $this->crudService = $crudService;
    }

    public function index()
    {
        $reports = $this->crudService->index(Report::class);
        return response()->json($reports);
    }

    public function store(Request $request)
    {
        if ($request->has('id')) {
            $report = $this->crudService->update(Report::class, $request->all());
        } else {
            $report = $this->crudService->create(Report::class, $request->all());
        }
        return response()->json($report);
    }

    public function show($id)
    {
        $report = $this->crudService->show(Report::class, $id);
        return response()->json($report);
    }

    public function destroy($id)
    {
        $this->crudService->destroy(Report::class, $id);
        return response()->json(['message' => 'Report deleted successfully']);
    }
}
