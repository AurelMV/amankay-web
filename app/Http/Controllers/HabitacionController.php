<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Habitacion;
use Inertia\Inertia;

class HabitacionController extends Controller
{
    public function store(Request $request)
{
    try {
        $validator = Validator::make($request->all(), [
            'numero' => 'required|string|max:10|unique:habitacions,numero',
            'tipo' => 'required|in:simple,doble,matrimonial',
            'descripcion' => 'nullable|string|max:255',
            'precio_noche' => 'required|numeric|min:0',
            'estado' => 'in:disponible,ocupada,mantenimiento',
            'capacidad' => 'required|integer|min:1',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:5120'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Crear directorio si no existe
        Storage::makeDirectory('public/imagenes_habitaciones');

        // Procesar imagen
        $rutaImagenPublica = null;
        if ($request->hasFile('imagen')) {
            $imagenFile = $request->file('imagen');
            $nombreArchivoImagen = uniqid('hab_') . '.' . $imagenFile->getClientOriginalExtension();
            $rutaImagen = $imagenFile->storeAs('imagenes_habitaciones', $nombreArchivoImagen, 'public');
            $rutaImagenPublica = Storage::url($rutaImagen); // Ej: /storage/imagenes_habitaciones/hab_xxx.jpg
        }

        // Guardar habitación en BD
        $habitacion = Habitacion::create([
            'numero' => $request->numero,
            'tipo' => $request->tipo,
            'descripcion' => $request->descripcion,
            'precio_noche' => $request->precio_noche,
            'estado' => $request->estado ?? 'disponible',
            'capacidad' => $request->capacidad,
            'imagen' => $rutaImagenPublica,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Habitación creada correctamente',
            'data' => $habitacion,
            'imagen_url' => $rutaImagenPublica ? asset($rutaImagenPublica) : null
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => 'Error al registrar habitación: ' . $e->getMessage()
        ], 500);
    }
}

public function RecursoCatalogo()
{
    try {
        $habitaciones = Habitacion::all();

        $data = $habitaciones->map(function ($hab) {
            return [
                'id' => $hab->id,
                'numero' => $hab->numero,
                'tipo' => $hab->tipo,
                'precio' => $hab->precio_noche,
                'capacidad' => $hab->capacidad,
                'estado' => $hab->estado,
                'imagen_url' => $hab->imagen ? asset($hab->imagen) : null
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => '❌ Error al obtener las habitaciones: ' . $e->getMessage()
        ], 500);
    }
}
}
