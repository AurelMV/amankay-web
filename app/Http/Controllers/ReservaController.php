<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservaController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validación
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'habitacion_id' => 'required|exists:habitacions,id',
                'fecha_inicio' => 'required|date',
                'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            ]);

            // Crear reserva
            $reserva = Reserva::create([
                'user_id' => $request->user_id,
                'habitacion_id' => $request->habitacion_id,
                'fecha_inicio' => $request->fecha_inicio,
                'fecha_fin' => $request->fecha_fin,
            ]);

            // Para Inertia, devolver una redirección con mensaje de éxito
            return redirect()->back()->with('success', 'Reserva creada correctamente');
        } catch (\Exception $e) {
            // Para Inertia, devolver una redirección con mensaje de error
            return redirect()->back()->withErrors(['message' => 'Error al crear la reserva: ' . $e->getMessage()]);
        }
    }
    public function index()
    {
        try {
            $reservas = Reserva::with(['user', 'habitacion'])->get();
            return  Inertia::render('admin/VisorPeticiones', [
                'reservas' => $reservas,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener las reservas: ' . $e->getMessage()
            ], 500);
        }
    }
}
