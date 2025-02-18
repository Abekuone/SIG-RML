<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
class RoleSeeder extends Seeder
{

    public function run(): void
    {
        $roles = [
            [
                'name' => 'Admin',
            ],
            [
                'name' => 'User',
            ],
            [
                'name' => 'Manager',
            ],
            [
                'name' => 'Employee',
            ],
            [
                'name' => 'Client',
            ],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
