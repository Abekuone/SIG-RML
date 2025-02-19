<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Report;

class ReportSeeder extends Seeder
{

    public function run(): void
    {
        $reservations = Reservation::all();
        $users = User::all();
        $reports = [
            [
                'type' => 'rapport de maintenance',
                'reservation_id' => $reservations->random()->id,
                'content' => 'Commentaire du rapport',
                'generate_by' => $users->random()->id,
            ],
            [
                'type' => 'rapport de sortie',
                'reservation_id' => $reservations->random()->id,
                'content' => 'Commentaire du rapport',
                'generate_by' => $users->random()->id,
            ],
            [
                'type' => 'rapport de réparation',
                'reservation_id' => $reservations->random()->id,
                'content' => 'Commentaire du rapport',
                'generate_by' => $users->random()->id,
            ],
            [
                'type' => 'rapport de réservation',
                'reservation_id' => $reservations->random()->id,
                'content' => 'Commentaire du rapport',
                'generate_by' => $users->random()->id,
            ],
        ];

        foreach ($reports as $report) {
            Report::create($report);
        }
    }
}
