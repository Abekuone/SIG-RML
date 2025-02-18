<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;
class PermissionSeeder extends Seeder
{

    public function run(): void
    {
        $permissions = [
            [
                'name' => 'Admin',
                'code' => 'admin',
            ],
            [
                'name' => 'User',
                'code' => 'user',
            ],
            [
                'name' => 'Manager',
                'code' => 'manager',
            ],
            [
                'name' => 'Employee',
                'code' => 'employee',
            ],
            [
                'name' => 'Client',
                'code' => 'client',
            ],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
}
