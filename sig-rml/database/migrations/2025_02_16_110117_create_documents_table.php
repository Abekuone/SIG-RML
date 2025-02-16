<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type');
            $table->integer('file_size');
            $table->uuid('documentable_id');
            $table->string('documentable_type');
            $table->uuid('uploaded_by');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
