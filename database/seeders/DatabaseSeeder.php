<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
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

        // Crear usuario admin
        $admin = User::factory()->create([
            'name' => 'Administrador',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
        ]);
        $admin->assignRole('admin');

        // Crear usuario cliente
        $cliente = User::factory()->create([
            'name' => 'Cliente Test',
            'email' => 'cliente@gmail.com',
            'password' => Hash::make('12345678'),
        ]);
        $cliente->assignRole('cliente');
    }
}
