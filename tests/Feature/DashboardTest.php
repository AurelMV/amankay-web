<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Aquí creas los roles necesarios para los tests
        Role::firstOrCreate(['name' => 'cliente']);
        Role::firstOrCreate(['name' => 'admin']);
    }

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $user = User::factory()->create();
        $user->assignRole('cliente'); // Asegúrate de asignar el rol

        $this->actingAs($user);

        $this->get('/dashboard')->assertOk();
    }
}
