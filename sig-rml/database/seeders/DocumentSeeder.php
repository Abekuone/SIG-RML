<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Report;
use App\Models\User;
use App\Models\Document;
use App\Models\Equipment;
use App\Models\Reservation;
class DocumentSeeder extends Seeder
{



    public function run(): void
    {
        $reports = Report::all();
        $users = User::all();
        $equipments = Equipment::all();
        $reservations = Reservation::all();

        $onlineDocuments = [
            'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
            'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
            'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
        ];

        $documents = [
            [
                'file_name' => 'document.pdf',
                'file_path' => $onlineDocuments[0],
                'file_type' => 'application/pdf',
                'file_size' => 100,
                'documentable_id' => $reports->random()->id,
                'documentable_type' => Report::class,
                'uploaded_by' => $users->random()->id,
            ],
            [
                'file_name' => 'document.pdf',
                'file_path' => $onlineDocuments[1],
                'file_type' => 'application/pdf',
                'file_size' => 100,
                'documentable_id' => $equipments->random()->id,
                'documentable_type' => Equipment::class,
                'uploaded_by' => $users->random()->id,
            ],
            [
                'file_name' => 'document.pdf',
                'file_path' => $onlineDocuments[2],
                'file_type' => 'application/pdf',
                'file_size' => 100,
                'documentable_id' => $reservations->random()->id,
                'documentable_type' => Reservation::class,
                'uploaded_by' => $users->random()->id,
            ],
        ];

        foreach ($documents as $document) {
            Document::create($document);
        }
    }
}
