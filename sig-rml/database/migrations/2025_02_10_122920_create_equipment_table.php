<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('type');
            $table->integer('quantity')->default(1);
            $table->enum('quality', ['Neuf', 'Bon état', 'En maintenance', 'Hors de service'])->default('Bon état');
            $table->enum('status', ['Disponible', 'Reservé'])->default('Disponible');
            $table->foreignUuid('proprietaire_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('laboratory_id')->constrained('laboratories')->onDelete('cascade');
            $table->foreignUuid('category_equipment_id')->constrained('category_equipments')->onDelete('cascade');
            $table->string('image')->nullable();
            $table->boolean('is_shared')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
