<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use App\Http\Controllers\Auth\KeycloakController;
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

Route::get('/auth/redirect', [KeycloakController::class, 'redirectToKeycloak'])->name('keycloak.redirect');
Route::get('/auth/callback', [KeycloakController::class, 'handleKeycloakCallback'])->name('keycloak.callback');
// Route::post('/logout', [KeycloakController::class, 'logout'])->name('logout');


Route::get('/home', function () {
    return view('home');
});

// Route::get('/auth/redirect', function () {
//     return Socialite::driver('keycloak')->redirect();
// });

// Route::get('/auth/callback', function (Request $request) {
//     try {
//         $socialUser = Socialite::driver('keycloak')->stateless()->user();

//         if (!$socialUser) {
//             return response()->json(['error' => 'Utilisateur non trouvé'], 401);
//         }

//         // Vérifier si l'utilisateur existe dans la base de données
//         $user = User::where('email', $socialUser->email)->first();

//         if (!$user) {
//             return response()->json(['error' => 'Utilisateur introuvable dans la base de données'], 401);
//         }

//         Auth::login($user);

//         // Générer un token d'authentification
//         $token = $user->createToken('keycloak_token')->plainTextToken;

//         return redirect('/');

//         return response()->json([
//             'user'  => $user,
//             'token' => $token,
//         ]);
//     } catch (\Exception $e) {
//         Log::error('Erreur Keycloak', ['exception' => $e]);

//         return response()->json([
//             'error' => 'Problème d\'authentification'
//         ], 500);
//     }
// });

Route::get('/auth/logout', function () {

    Auth::logout();

    $redirectUri = route('landing');

    // Obtenir l'URL de déconnexion de Keycloak
    $logoutUrl = Socialite::driver('keycloak')->getLogoutUrl(
        $redirectUri,
        env('KEYCLOAK_CLIENT_ID'),
        session('keycloak_id_token') // Stocker le token dans la session après login
    );

    dd($logoutUrl);

    // Rediriger vers Keycloak pour finaliser le logout
    return redirect($logoutUrl);
})->name('logout');
