<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class AppHelper
{

    public static function getCurrentRole(array $roles): ?string
    {
        $excludedRoles = [
            'manage-account',
        ];

        foreach ($roles as $role) {
            if (!in_array($role, $excludedRoles)) {
                return $role;
            }
        }

        return null;
    }
}
