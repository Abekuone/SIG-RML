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
            $existingReservation = Reservation::find($request->id);
            if (!$existingReservation) {
                return response()->json(['message' => 'Réservation non trouvée'], 404);
            }
            $reservation = $this->crudService->update(Reservation::class, $request->id, $request->all());
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

    public function getReservationWithAllRelations($reservationId)
    {
        $reservation = Reservation::find($reservationId);
        $reservation->load('equipement', 'laboratory', 'user');
        return response()->json($reservation);
    }

    public function getReservationByLaboratoryId($laboratoryId)
    {
        $reservations = Reservation::where('laboratory_id', $laboratoryId)->get();
        return response()->json($reservations);
    }

    public function getReservationByUserId($userId)
    {
        $reservations = Reservation::where('user_id', $userId)->get();
        return response()->json($reservations);
    }

    public function getReservationByEquipementId($equipementId)
    {
        $reservations = Reservation::where('equipement_id', $equipementId)->get();
        return response()->json($reservations);
    }

    public function getReservationByEquipementIdAndLaboratoryId($equipementId, $laboratoryId)
    {
        $reservations = Reservation::where('equipement_id', $equipementId)
            ->where('laboratory_id', $laboratoryId)
            ->get();
        return response()->json($reservations);
    }

    public function getReservationByEquipementIdAndLaboratoryIdAndUserId($equipementId, $laboratoryId, $userId)
    {
        $reservations = Reservation::where('equipement_id', $equipementId)
            ->where('laboratory_id', $laboratoryId)
            ->where('user_id', $userId)
            ->get();
        return response()->json($reservations);
    }
}
