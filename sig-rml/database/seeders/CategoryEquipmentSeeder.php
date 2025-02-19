<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CategoryEquipment;
class CategoryEquipmentSeeder extends Seeder
{

    public function run(): void
    {
        $categories = [
            [
                'name' => 'Informatique',
            ],
            [
                'name' => 'Matériel de bureau',
            ],
            [
                'name' => 'Matériel de bureau',
            ],
            [
                'name' => 'Matériel de bureau',
            ],
        ];

        foreach ($categories as $category) {
            CategoryEquipment::create($category);
        }
    }
}
