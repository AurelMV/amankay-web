<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Role::firstorCreate(['name' => 'admin']);
        Role::firstorCreate(['name' => 'cliente']);

        $user = User::factory()->create([
            'email' => 'admin@gmail.com',
        ]);
        $user->assignRole('admin');
    }
}
