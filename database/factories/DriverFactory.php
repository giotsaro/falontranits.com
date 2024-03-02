<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Driver>
 */
class DriverFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            
            
            'unit'=> rand(9999,2),
            'name'=> fake()->unique()->name(),
           'dims'=> rand(9999,2),
           'payload'=> rand(9999,2),
           'phone'=> fake()->phoneNumber(),
           'location'=>fake()->city(),
           'zip'=> fake()->postcode(),
            'comments'=>fake()->company(),
            'email' => fake()->unique()->safeEmail(),
          'emergency'=>fake()->colorName(),
           'reserved'=>rand(1,0),
           'reserved_by'=>fake()->name(),
           'company_id'=>1,
           'creator'=>18,
           'created_at'=>now(),
           'updated_at'=>now(),
          




        ];
    }
}
