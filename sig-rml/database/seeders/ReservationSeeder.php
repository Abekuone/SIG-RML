<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Equipment;
use App\Models\Reservation;

class ReservationSeeder extends Seeder
{

    public function run(): void
    {
        $users = User::all();
        $equipments = Equipment::all();

        $reservations = [
            [
                'user_id' => $users->random()->id,
                'equipment_id' => $equipments->random()->id,
                'start_date' => now(),
                'end_date' => now()->addDays(7),
                'status' => 'pending',
                'comment' => 'Commentaire de la réservation',
            ],
            [
                'user_id' => $users->random()->id,
                'equipment_id' => $equipments->random()->id,
                'start_date' => now(),
                'end_date' => now()->addDays(7),
                'status' => 'pending',
                'comment' => 'Commentaire de la réservation',
            ],
            [
                'user_id' => $users->random()->id,
                'equipment_id' => $equipments->random()->id,
                'start_date' => now(),
                'end_date' => now()->addDays(7),
                'status' => 'pending',
                'comment' => 'Commentaire de la réservation',
            ],
            [
                'user_id' => $users->random()->id,
                'equipment_id' => $equipments->random()->id,
                'start_date' => now(),
                'end_date' => now()->addDays(7),
                'status' => 'pending',
                'comment' => 'Commentaire de la réservation',
            ],
            [
                'user_id' => $users->random()->id,
                'equipment_id' => $equipments->random()->id,
                'start_date' => now(),
                'end_date' => now()->addDays(7),
                'status' => 'pending',
                'comment' => 'Commentaire de la réservation',
            ],
        ];

        foreach ($reservations as $reservation) {
            Reservation::create($reservation);
        }
    }
}
