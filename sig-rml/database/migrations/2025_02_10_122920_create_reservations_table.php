<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('equipment_id')->constrained('equipments')->onDelete('cascade');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('status')->default('En attente');
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
