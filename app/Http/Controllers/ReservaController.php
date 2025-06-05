<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;

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

            return response()->json([
                'message' => 'Reserva creada correctamente',
                'reserva' => $reserva
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al crear la reserva: ' . $e->getMessage()
            ], 500);
        }
    }
}
