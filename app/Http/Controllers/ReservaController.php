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
                // Validar también los datos del detalle
                'nombres_personas' => 'required|string',
                'metodo_pago' => 'required|in:efectivo,tarjeta',
                'telefono' => 'nullable|string',
                'documento' => 'nullable|string',
            ]);

            // Crear reserva
            $reserva = Reserva::create([
                'user_id' => $request->user_id,
                'habitacion_id' => $request->habitacion_id,
                'fecha_inicio' => $request->fecha_inicio,
                'fecha_fin' => $request->fecha_fin,
            ]);

            // Crear detalle de reserva
            \App\Models\DetalleReserva::create([
                'reserva_id' => $reserva->id,
                'user_id' => $request->user_id,
                'nombres_personas' => $request->nombres_personas,
                'metodo_pago' => $request->metodo_pago,
                'telefono' => $request->telefono,
                'documento' => $request->documento,
            ]);

            // Redirige con mensaje de éxito usando Inertia
            return redirect()->back()->with('success', '¡Reserva creada correctamente!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al crear la reserva: ' . $e->getMessage());
        }
    }
}
