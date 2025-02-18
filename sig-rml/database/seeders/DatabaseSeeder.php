<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\LaboratorySeeder;
use Database\Seeders\CategoryEquipmentSeeder;
use Database\Seeders\EquipmentSeeder;
use Database\Seeders\ReportSeeder;
use Database\Seeders\DocumentSeeder;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            LaboratorySeeder::class,
            CategoryEquipmentSeeder::class,
            EquipmentSeeder::class,
            ReservationSeeder::class,
            ReportSeeder::class,
            DocumentSeeder::class,
            ActionLogSeeder::class
        ]);
    }
}
