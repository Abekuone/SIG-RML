<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:keycloak-token')->group(function () {
    Route::apiResource('laboratories', LaboratoryController::class);
    Route::apiResource('equipments', EquipmentController::class);
    Route::apiResource('reservations', ReservationController::class);
    Route::apiResource('notifications', NotificationController::class);
    Route::apiResource('reports', ReportController::class);
});



