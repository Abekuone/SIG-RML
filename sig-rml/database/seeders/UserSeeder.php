<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class UserSeeder extends Seeder
{

    public function run(): void
    {
        $role = Role::all();
        $users = [
            [
                'name' => 'John Doe',
                'email' => 'john@doe.com',
                'password' => bcrypt('password'),
                'role_id' => $role->random()->id,
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('password'),
                'role_id' => $role->random()->id,
            ],
            [
                'name' => 'OUEDRAOGO',
                'email' => 'ouedraogo@gmail.com',
                'password' => bcrypt('password'),
                'role_id' => $role->random()->id,
            ],
            [
                'name' => 'KABORE',
                'email' => 'kabore@gmail.com',
                'password' => bcrypt('password'),
                'role_id' => $role->random()->id,
            ],
            [
                'name' => 'DIALLO',
                'email' => 'diallo@gmail.com',
                'password' => bcrypt('password'),
                'role_id' => $role->random()->id,
            ],
            [
                'name' => 'SARR',
                'email' => 'sarr@gmail.com',
                'password' => bcrypt('password'),
                'role_id' => $role->random()->id,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
