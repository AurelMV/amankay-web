<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HabitacionController;
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas para cliente y admin
Route::middleware(['auth', 'verified', 'role:admin|cliente'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
Route::post('/habitaciones', [HabitacionController::class, 'store']);
Route::get('/habitaciones/catalogo', [HabitacionController::class, 'RecursoCatalogo']);

});

// Rutas protegidas solo para admin
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('admin/dashboard', function () {
        return Inertia::render('admin/dashboard-admin');
    })->name('admin.dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

