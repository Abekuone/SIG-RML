<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Laboratory;

class LaboratorySeeder extends Seeder
{

    public function run(): void
    {
        $users = User::all();
        $laboratory = [
            [
                'name' => 'Laboratoire de Physique',
                'description' => 'Laboratoire de Physique',
                'manager_id' => $users->random()->id,
            ],
            [
                'name' => 'Laboratoire de Chimie',
                'description' => 'Laboratoire de Chimie',
                'manager_id' => $users->random()->id,
            ],
            [
                'name' => 'Laboratoire de Biologie',
                'description' => 'Laboratoire de Biologie',
                'manager_id' => $users->random()->id,
            ],
            [
                'name' => 'Laboratoire de Mathématiques',
                'description' => 'Laboratoire de Mathématiques',
                'manager_id' => $users->random()->id,
            ],
        ];

        foreach ($laboratory as $lab) {
            Laboratory::create($lab);
        }
    }
}
