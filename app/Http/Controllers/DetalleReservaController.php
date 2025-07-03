<?php

namespace App\Http\Controllers;

use App\Models\DetalleReserva;
use Illuminate\Http\Request;

class DetalleReservaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'reserva_id' => 'required|exists:reservas,id',
            'user_id' => 'required|exists:users,id',
            'nombres_personas' => 'required|string',
            'metodo_pago' => 'required|in:efectivo,tarjeta',
            'telefono' => 'nullable|string',
            'documento' => 'nullable|string',
        ]);

        $detalle = DetalleReserva::create($validated);

        return response()->json([
            'message' => 'Detalle de reserva guardado correctamente',
            'detalle' => $detalle,
        ], 201);
    }
}
