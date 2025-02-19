<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{

    public function run(): void
    {
        $role = Role::all();
        $users = [
            [
                'name' => 'Armel SOME',
                'email' => 'sbekuonesome@gmail.com',
                'password' => bcrypt('11111111'),
                'role_id' => $role->random()->id,
                'keycloak_id' => Str::uuid(),
            ],
            [
                'name' => 'John Doe',
                'email' => 'john@doe.com',
                'password' => bcrypt('password'),
                'role_id' => $role->random()->id,
                'keycloak_id' => Str::uuid(),
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('password'),
                'role_id' => $role->random()->id,
                'keycloak_id' => Str::uuid(),
            ],
            [
                'name' => 'OUEDRAOGO',
                'email' => 'ouedraogo@gmail.com',
                'password' => bcrypt('password'),
                'role_id' => $role->random()->id,
                'keycloak_id' => Str::uuid(),
            ],
            [
                'name' => 'KABORE',
                'email' => 'kabore@gmail.com',
                'password' => bcrypt('password'),
                'role_id' => $role->random()->id,
                'keycloak_id' => Str::uuid(),
            ],
            [
                'name' => 'DIALLO',
                'email' => 'diallo@gmail.com',
                'password' => bcrypt('password'),
                'role_id' => $role->random()->id,
                'keycloak_id' => Str::uuid(),
            ],
            [
                'name' => 'SARR',
                'email' => 'sarr@gmail.com',
                'password' => bcrypt('password'),
                'role_id' => $role->random()->id,
                'keycloak_id' => Str::uuid(),
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
