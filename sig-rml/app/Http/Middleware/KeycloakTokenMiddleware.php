<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\services\KeycloakService;
use Illuminate\Support\Facades\Log;

class KeycloakTokenMiddleware
{
    protected $keycloakService;

    public function __construct(KeycloakService $keycloakService)
    {
        $this->keycloakService = $keycloakService;
    }

    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token || !$this->keycloakService->validateToken($token)) {
            return response()->json(['error' => 'Token invalide ou expiré'], 401);
        }

        return $next($request);
    }
}
