<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use KeycloakGuard\Exceptions\TokenException;

class Handler
{
    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (TokenException $e) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Token expired',
                'code' => 'TOKEN_EXPIRED'
            ], 401);
        });
    }
}
