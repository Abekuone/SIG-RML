<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\KeycloakController;
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

//Authentification avec Sanctum
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register')->middleware('log.action:Registration,User registered');
    Route::post('/login', 'login')->middleware('log.action:Login,User logged in');
    Route::post('password/forgot', 'forgotPassword')->middleware('log.action:Password Forgot,User requested password reset');
    Route::post('password/reset', 'resetPassword')->middleware('log.action:Password Reset,User reset password');
});

//Authentification avec Keycloak
Route::get('/auth/redirect', function () {
    return Socialite::driver('keycloak')->redirect();
});

Route::get('/auth/callback', function () {
    $user = Socialite::driver('keycloak')->user();

    // Trouver ou créer l'utilisateur
    $existingUser = \App\Models\User::where('email', $user->getEmail())->first();
    if (!$existingUser) {
        $existingUser = \App\Models\User::create([
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'password' => bcrypt(uniqid()),
        ]);
    }

    Auth::login($existingUser);

    return redirect('/');
});


Route::get('/logout', function () {
    Auth::logout();
    return redirect('http://localhost:8080/realms/sig-rml/protocol/openid-connect/logout?redirect_uri=http://localhost:8000');
});

Route::middleware(['verify-keycloak-token'])->get('/user', function (Request $request) {
    return $request->user();
});

//Authentification avec Keycloak
// Route::get('auth/redirect', [KeycloakController::class, 'redirectToProvider'])->name('keycloak.redirect')->middleware('log.action:Keycloak Redirect,Keycloak redirect');
// Route::get('auth/callback', [KeycloakController::class, 'handleProviderCallback'])->name('keycloak.callback')->middleware('log.action:Keycloak Callback,Keycloak callback');
// Route::post('logout', [KeycloakController::class, 'logout'])->name('logout')->middleware('log.action:Logout,User logged out');

//Route pour les ressources
// Route::middleware('auth:keycloak')->group(function () {
// });

Route::apiResource('laboratories', LaboratoryController::class)->middleware('log.action:Laboratory,Action sur le laboratoire');
Route::apiResource('equipments', EquipmentController::class)->middleware('log.action:Equipment,Action sur l\'équipement');
Route::apiResource('reservations', ReservationController::class)->middleware('log.action:Reservation,Action sur la réservation');
Route::apiResource('notifications', NotificationController::class)->middleware('log.action:Notification,Action sur la notification');
Route::apiResource('reports', ReportController::class)->middleware('log.action:Report,Action sur le rapport');
Route::apiResource('users', UserController::class)->middleware('log.action:User,Action sur l\'utilisateur');
Route::apiResource('documents', DocumentController::class)->middleware('log.action:Document,Action sur le document');
Route::apiResource('action-logs', ActionLogController::class)->middleware('log.action:Action Log,Action sur le journal des actions');


// Route::get('auth/redirect', function () {
//     return Socialite::driver('keycloak')->redirect();
// });

// Route::get('auth/callback', function () {
//     $user = Socialite::driver('keycloak')->user();
//     dd($user);
// });


