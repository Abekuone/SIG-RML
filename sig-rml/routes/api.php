<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\KeycloakApiAuthController;
use App\Http\Controllers\LaboratoryController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ActionLogController;
use App\Http\Controllers\CategoryEquipmentController;

//Authentification avec Sanctum
// Route::controller(AuthController::class)->group(function () {
//     Route::post('/register', 'register');
//     Route::post('/login', 'login');
//     Route::post('password/forgot', 'forgotPassword')->middleware('log.action:Password Forgot,User requested password reset');
//     Route::post('password/reset', 'resetPassword')->middleware('log.action:Password Reset,User reset password');
// });

// Authentification avec Keycloak directement
Route::get('/auth/register/redirect', [KeycloakApiAuthController::class, 'redirectToKeycloakForLogin']);
Route::get('auth/register/callback', [KeycloakApiAuthController::class, 'handleKeycloakCallbackForLogin']);
Route::post('/auth/logout', [KeycloakApiAuthController::class, 'keycloakLogout']);
// Register directement avec API Keycloak
Route::post('/register', [KeycloakApiAuthController::class, 'keycloakRegister']);

Route::middleware(['verify-keycloak-token'])->get('/user', function (Request $request) {
    return $request->user();
});

// Route pour les ressources
Route::middleware(['keycloak'])->get('/profile', function (Request $request) {
    return response()->json(["message" => "Tu es authentifié via Keycloak"]);
});

Route::apiResource('laboratories', LaboratoryController::class)->middleware('log.action:Laboratory,Action sur le laboratoire');
Route::apiResource('category-equipments', CategoryEquipmentController::class)->middleware('log.action:Category Equipment,Action sur la catégorie d\'équipement');
Route::apiResource('equipments', EquipmentController::class)->middleware('log.action:Equipment,Action sur l\'équipement');
Route::apiResource('reservations', ReservationController::class)->middleware('log.action:Reservation,Action sur la réservation');
Route::apiResource('notifications', NotificationController::class)->middleware('log.action:Notification,Action sur la notification');
Route::apiResource('reports', ReportController::class)->middleware('log.action:Report,Action sur le rapport');
Route::apiResource('users', UserController::class)->middleware('log.action:User,Action sur l\'utilisateur');
Route::apiResource('documents', DocumentController::class)->middleware('log.action:Document,Action sur le document');
Route::apiResource('action-logs', ActionLogController::class)->middleware('log.action:Action Log,Action sur le journal des actions');

Route::prefix('laboratories')->controller(LaboratoryController::class)->group(function () {
    Route::get('/{laboratoryId}/equipements', 'getEquipementByLaboratoryId');
    Route::get('/{laboratoryId}/category-equipments', 'getCategoryEquipmentByLaboratoryId');
});

Route::prefix('equipements')->controller(EquipmentController::class)->group(function () {
    Route::get('/{equipementId}/reservations', 'getReservationByEquipementId');
});

Route::prefix('users')->controller(UserController::class)->group(function () {
    Route::get('/{userId}/reservations', 'getUserWithReservations');
    Route::get('/{userId}/reports', 'getUserWithReports');
    Route::get('/{userId}/notifications', 'getUserWithNotifications');
});

Route::prefix('reservations')->controller(ReservationController::class)->group(function () {
    Route::get('/{reservationId}/with-relations', 'getReservationWithAllRelations');
    Route::get('/by-laboratory/{laboratoryId}', 'getReservationByLaboratoryId');
    Route::get('/by-user/{userId}', 'getReservationByUserId');
    Route::get('/by-equipment/{equipementId}', 'getReservationByEquipementId');
    Route::get('/by-equipment/{equipementId}/and-laboratory/{laboratoryId}', 'getReservationByEquipementIdAndLaboratoryId');
    Route::get('/by-equipment/{equipementId}/and-laboratory/{laboratoryId}/and-user/{userId}', 'getReservationByEquipementIdAndLaboratoryIdAndUserId');
});

Route::prefix('equipements')->controller(EquipmentController::class)->group(function () {
    Route::get('/{equipementId}/with-relations', 'getEquipementWithAllRelations');
    Route::get('/by-laboratory/{laboratoryId}', 'getEquipementByLaboratoryId');
    Route::get('/by-category-equipment/{categoryEquipmentId}', 'getEquipementByCategoryEquipmentId');
});

Route::prefix('category-equipments')->controller(CategoryEquipmentController::class)->group(function () {
    Route::get('/{categoryEquipmentId}/with-relations', 'getCategoryEquipmentWithAllRelations');
    Route::get('/by-laboratory/{laboratoryId}', 'getCategoryEquipmentByLaboratoryId');
    Route::get('/by-equipement/{equipementId}', 'getCategoryEquipmentByEquipementId');
});

Route::prefix('laboratories')->controller(LaboratoryController::class)->group(function () {
    Route::get('/{laboratoryId}/with-relations', 'getLaboratoryWithAllRelations');
    Route::get('/by-equipement/{equipementId}', 'getLaboratoryByEquipementId');
    Route::get('/by-category-equipment/{categoryEquipmentId}', 'getLaboratoryByCategoryEquipmentId');
});

Route::prefix('notifications')->controller(NotificationController::class)->group(function () {
    Route::get('/{notificationId}/with-relations', 'getNotificationWithAllRelations');
    Route::get('/by-user/{userId}', 'getNotificationByUserId');
    Route::get('/by-laboratory/{laboratoryId}', 'getNotificationByLaboratoryId');
    Route::get('/by-equipement/{equipementId}', 'getNotificationByEquipementId');
});

Route::prefix('reports')->controller(ReportController::class)->group(function () {
    Route::get('/{reportId}/with-relations', 'getReportWithAllRelations');
    Route::get('/by-user/{userId}', 'getReportByUserId');
    Route::get('/by-laboratory/{laboratoryId}', 'getReportByLaboratoryId');
    Route::get('/by-equipement/{equipementId}', 'getReportByEquipementId');
});

Route::prefix('users')-> controller(UserController::class)->group(function () {
    Route::get('/{userId}/with-relations', 'getUserWithAllRelations');
    Route::get('/by-laboratory/{laboratoryId}', 'getUserByLaboratoryId');
    Route::get('/by-equipement/{equipementId}', 'getUserByEquipementId');
});

Route::prefix('documents')->controller(DocumentController::class)->group(function () {
    Route::get('/{documentId}/with-relations', 'getDocumentWithAllRelations');
    Route::get('/by-documentable/{documentableId}', 'getDocumentByDocumentableId');
});
