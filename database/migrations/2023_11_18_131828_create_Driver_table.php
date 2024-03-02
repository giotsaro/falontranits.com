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
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->string('unit');
            $table->string('name');
            $table->string('dims');
            $table->string('payload');
            $table->string('phone');
            $table->string('location')->nullable();
            $table->string('zip');
            $table->string('comments')->nullable();
            $table->string('email');
            $table->string('emergency')->nullable();
            $table->string('reserved');
            $table->string('reserved_by');
            $table->integer('company_id')->reference('id')->on('company');
            $table->integer('creator')->reference('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};
