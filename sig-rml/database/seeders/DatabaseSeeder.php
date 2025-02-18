<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\LaboratorySeeder;
use Database\Seeders\CategoryEquipmentSeeder;
use Database\Seeders\EquipmentSeeder;
use Database\Seeders\ReportSeeder;
use Database\Seeders\DocumentSeeder;
use Database\Seeders\ActionLogSeeder;
use Database\Seeders\ReservationSeeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RolePermissionSeeder;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        $this->call([
            CategoryEquipmentSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class,
            UserSeeder::class,
            LaboratorySeeder::class,
            EquipmentSeeder::class,
            ReservationSeeder::class,
            ReportSeeder::class,
            DocumentSeeder::class,
            ActionLogSeeder::class,
        ]);
    }
}
