<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Aquí creas los roles necesarios para los tests
        Role::firstOrCreate(['name' => 'cliente']);
        Role::firstOrCreate(['name' => 'admin']);
    }

    public function test_login_screen_can_be_rendered()
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen()
    {
        $user = User::factory()->create();
        $user->assignRole('cliente'); // Asigna el rol necesario

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect('/'); // Usuarios cliente se redirigen a la página principal
    }

    public function test_admin_users_can_authenticate_and_redirect_to_admin_dashboard()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin'); // Asigna el rol de admin

        $response = $this->post('/login', [
            'email' => $admin->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('admin.dashboard', absolute: false)); // Usuarios admin se redirigen al dashboard de admin
    }

    public function test_users_can_not_authenticate_with_invalid_password()
    {
        $user = User::factory()->create();
        $user->assignRole('cliente'); // Asigna el rol necesario

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_users_can_logout()
    {
        $user = User::factory()->create();
        $user->assignRole('cliente'); // Asigna el rol necesario

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
}
