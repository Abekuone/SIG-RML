<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use App\Http\Controllers\Auth\KeycloakApiAuthController;
use App\Http\Controllers\LaboratoryController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ActionLogController;
use App\Http\Controllers\CategoryEquipmentController;


Route::get('/', function () {
    return view('welcome');
})->name('landing');

Route::get('/home', function () {
    return view('home');
});

Route::get('/auth/register/redirect', [KeycloakApiAuthController::class, 'redirectToKeycloakForRegister'])->name('register.keycloak');
Route::get('/auth/register/callback', [KeycloakApiAuthController::class, 'handleKeycloakRegisterCallback']);
Route::post('/auth/logout', [KeycloakApiAuthController::class, 'keycloakLogout'])->name('logout');
// Register directement avec API Keycloak
Route::post('/register', [KeycloakApiAuthController::class, 'keycloakRegister']);
