<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Document;
use App\Models\Report;
use App\Models\Equipment;
use App\Models\Reservation;
use App\Models\ActionLog;

class ActionLogSeeder extends Seeder
{

    public function run(): void
    {
        $users = User::all();
        $documents = Document::all();
        $reports = Report::all();
        $equipments = Equipment::all();
        $reservations = Reservation::all();

        $actionLogs = [
            [
                'user_id' => $users->random()->id,
                'action' => 'download',
                'documentable_id' => $documents->random()->id,
                'documentable_type' => Document::class,
            ],
            [
                'user_id' => $users->random()->id,
                'action' => 'download',
                'documentable_id' => $reports->random()->id,
                'documentable_type' => Report::class,
            ],
            [
                'user_id' => $users->random()->id,
                'action' => 'download',
                'documentable_id' => $equipments->random()->id,
                'documentable_type' => Equipment::class,
            ],
            [
                'user_id' => $users->random()->id,
                'action' => 'download',
                'documentable_id' => $reservations->random()->id,
                'documentable_type' => Reservation::class,
            ],
        ];

        foreach ($actionLogs as $actionLog) {
            ActionLog::create($actionLog);
        }
    }
}
