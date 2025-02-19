<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\ActionLog;
use Illuminate\Support\Facades\Auth;

class LogActionMiddleware
{
    public function handle(Request $request, Closure $next, $action, $description = null)
    {
        $response = $next($request);

        if (Auth::check()) {
            ActionLog::create([
                'action' => $action,
                'user_id' => Auth::user()->id,
                'description' => $description ?? "Aucune description fournie",
            ]);
        }

        return $response;
    }
}
