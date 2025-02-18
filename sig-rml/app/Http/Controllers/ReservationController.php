<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\services\CrudService;

class ReservationController extends Controller
{
    protected $crudService;

    public function __construct(CrudService $crudService)
    {
        $this->crudService = $crudService;
    }

    public function index()
    {
        $reservations = $this->crudService->index(Reservation::class);
        return response()->json($reservations);
    }

    public function store(Request $request)
    {
        if ($request->has('id')) {
            $reservation = $this->crudService->update(Reservation::class, $request->all());
        } else {
            $reservation = $this->crudService->create(Reservation::class, $request->all());
        }
        return response()->json($reservation);
    }

    public function show($id)
    {
        $reservation = $this->crudService->show(Reservation::class, $id);
        return response()->json($reservation);
    }

    public function destroy($id)
    {
        $this->crudService->destroy(Reservation::class, $id);
        return response()->json(['message' => 'Reservation deleted successfully']);
    }
}
