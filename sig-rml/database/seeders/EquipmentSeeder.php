<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CategoryEquipment;
use App\Models\Equipment;
use App\Models\Laboratory;
use App\Models\User;

class EquipmentSeeder extends Seeder
{

    public function run(): void
    {
        $categories = CategoryEquipment::all();
        $laboratories = Laboratory::all();
        $users = User::all();

        $equipments = [
            [
                'name' => 'Ordinateur',
                'description' => 'Ordinateur de bureau',
                'type' => 'Informatique',
                'quantity' => 1,
                'quality' => 'Bon',
                'status' => 'Disponible',
                'proprietaire_id' => $users->random()->id,
                'category_equipment_id' => $categories->random()->id,
                'laboratory_id' => $laboratories->random()->id,
                'availability' => true,
                'image' => 'ordi.jpg',
                'is_shared' => true,
            ],
            [
                'name' => 'Ordinateur',
                'description' => 'Ordinateur de bureau',
                'type' => 'Informatique',
                'quantity' => 1,
                'quality' => 'Bon',
                'status' => 'Disponible',
                'proprietaire_id' => $users->random()->id,
                'category_equipment_id' => $categories->random()->id,
                'laboratory_id' => $laboratories->random()->id,
                'availability' => true,
                'image' => 'ordi.jpg',
                'is_shared' => true,
            ],
            [
                'name' => 'Microscope',
                'description' => 'Microscope',
                'type' => 'Informatique',
                'quantity' => 1,
                'quality' => 'Bon',
                'status' => 'Disponible',
                'proprietaire_id' => $users->random()->id,
                'category_equipment_id' => $categories->random()->id,
                'laboratory_id' => $laboratories->random()->id,
                'availability' => true,
                'image' => 'microscope.jpg',
                'is_shared' => true,
            ],
            [
                'name' => 'Girouette',
                'description' => 'Girouette',
                'type' => 'Informatique',
                'quantity' => 1,
                'quality' => 'Bon',
                'status' => 'Disponible',
                'proprietaire_id' => $users->random()->id,
                'category_equipment_id' => $categories->random()->id,
                'laboratory_id' => $laboratories->random()->id,
                'availability' => true,
                'image' => 'girouette.jpg',
                'is_shared' => true,
            ],
            [
                'name' => 'Tableau noir',
                'description' => 'Tableau noir',
                'type' => 'Informatique',
                'quantity' => 1,
                'quality' => 'Bon',
                'status' => 'Disponible',
                'proprietaire_id' => $users->random()->id,
                'category_equipment_id' => $categories->random()->id,
                'laboratory_id' => $laboratories->random()->id,
                'availability' => true,
                'image' => 'tableau_noir.jpg',
                'is_shared' => true,
            ],
            [
                'name' => 'Imprimante',
                'description' => 'Imprimante',
                'type' => 'Informatique',
                'quantity' => 1,
                'quality' => 'Bon',
                'status' => 'Disponible',
                'proprietaire_id' => $users->random()->id,
                'category_equipment_id' => $categories->random()->id,
                'laboratory_id' => $laboratories->random()->id,
                'availability' => true,
                'image' => 'imprimante.jpg',
                'is_shared' => true,
            ],
        ];

        foreach ($equipments as $equipment) {
            Equipment::create($equipment);
        }
    }
}
