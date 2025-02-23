<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\RegisterMail;

class AuthController extends Controller
{
    public function register($data)
    {
        $existingUser = User::where('email', $data['email'])->first();
        if ($existingUser) {
            return response()->json(['message' => 'un utilisateur avec ces identifiants existe déjà'], 409);
        }
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        Mail::to($user->email)->send(new RegisterMail($user));
        return ['user' => $user, 'token' => $token];
    }

    public function login($credentials, $loginField)
    {
        $loginData = [$loginField => $credentials[$loginField], 'password' => $credentials['password']];

        if (!Auth::attempt($loginData)) {
            return null;
        }

        return Auth::user()->createToken('auth_token')->plainTextToken;
    }
}
