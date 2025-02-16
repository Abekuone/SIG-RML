<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class AppHelper
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public static function getCurrentRole(array $roles): ?string
    {
        $excludedRoles = [
            'manage-account',
            'manage-account-links',
            'view-profile'
        ];

        foreach ($roles as $role) {
            if (!in_array($role, $excludedRoles)) {
                return $role;
            }
        }

        return null;
    }
}
