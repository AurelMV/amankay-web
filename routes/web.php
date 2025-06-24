<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HabitacionController;
use App\Http\Controllers\ReservaController;

// Página de inicio
Route::get('/', function () {
    return Inertia::render('welcome');
});

// Página Home (Blade)
Route::get('/home', function () {
    return view('home');
})->name('home');

// Catálogo público de habitaciones para React (sin auth)
Route::get('/api/habitaciones', [HabitacionController::class, 'RecursoCatalogo']);
Route::get('/habitaciones/catalogo', [HabitacionController::class, 'RecursoCatalogo']);

// Rutas accesibles solo para usuarios autenticados (admin o cliente)
Route::middleware(['auth', 'verified', 'role:admin|cliente'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Rutas para reservas (desde React)
    Route::get('/reservas', [ReservaController::class, 'index']);
    Route::post('/reservas', [ReservaController::class, 'store']);
    Route::get('/reservas/{id}', [ReservaController::class, 'show']);
    Route::post('/habitaciones', [HabitacionController::class, 'store']);
    Route::get('/habitaciones/catalogo', [HabitacionController::class, 'RecursoCatalogo']);
    Route::post('/reservas', [ReservaController::class, 'store']);
    Route::post('/reservas', [ReservaController::class, 'store'])->name('reservas.store');
});



// Rutas solo para administrador
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('admin/dashboard', function () {
        return Inertia::render('admin/dashboard-admin');
    })->name('admin.dashboard');
    Route::get('admin/usuarios', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('admin.users');
    Route::get('admin/habitaciones', [\App\Http\Controllers\HabitacionController::class, 'index'])->name('admin.habitaciones');
    Route::post('/habitaciones', [HabitacionController::class, 'store']);
    Route::get('/habitaciones/catalogo', [HabitacionController::class, 'RecursoCatalogo']);
    Route::get('/habitaciones/{id}', [HabitacionController::class, 'show']);

    Route::put('/habitaciones/{id}', [HabitacionController::class, 'update']);
    Route::delete('/habitaciones/{id}', [HabitacionController::class, 'destroy']);
});

// Otros archivos de rutas
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
