<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ZIPcode>
 */
class ZIPcodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           

            'city'=> fake()->city(),
            'county'=> fake()->country(),
            'state_name'=> fake()->state(),
            'state_id'=> fake()->state(),
            'zip_code'=> fake()->postcode(),
            'LAT'=> fake()->latitude(),
            'LNG'=> fake()->longitude(),
           'created_at'=>now(),
           'updated_at'=>now(),
          
        ];
    }
}
