<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Driver;
use Illuminate\Database\Seeder;
use Spatie\Permission\models\Role;
use Spatie\Permission\models\Permission;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
     // User::factory(50)->create();
      Driver::factory(50)->create();

      //  $user = User::find(1);
       // $user->assignRole('dispatcher','hr','admin');
        
       // $this->call(RoleSeeder::class);
       // $this->call(PermissionSeeder::class);
            
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
