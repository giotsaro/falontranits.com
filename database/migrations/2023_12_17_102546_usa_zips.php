<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::rename('usa_zips', 'usa_zips');

   /*      Schema::create('usa_zips', function (Blueprint $table) {
            $table->id();
            $table->string('city');
            $table->string('county');
            $table->string('state_name');
            $table->string('state_id');
            $table->integer('zip_code');
            $table->string('LAT')->nullable();
            $table->string('LNG')->nullable();
            $table->timestamps();
        }); */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usa_zips');
    }
};
