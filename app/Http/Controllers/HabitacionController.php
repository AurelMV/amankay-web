<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Habitacion;
use Inertia\Inertia;

class HabitacionController extends Controller
{
    public function index()
    {
        // Retorna la vista de habitaciones
        return Inertia::render('admin/AdministacionHabitaciones');
    }

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
                    'descripcion' => $hab->descripcion,
                    'precio_noche' => $hab->precio_noche,
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

    public function show($id)
    {
        try {
            $habitacion = Habitacion::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $habitacion->id,
                    'numero' => $habitacion->numero,
                    'tipo' => $habitacion->tipo,
                    'descripcion' => $habitacion->descripcion,
                    'precio_noche' => $habitacion->precio_noche,
                    'estado' => $habitacion->estado,
                    'capacidad' => $habitacion->capacidad,
                    'imagen_url' => $habitacion->imagen ? asset($habitacion->imagen) : null
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al obtener la habitación: ' . $e->getMessage()
            ], 404);
        }
    }

    // Método para actualizar una habitación
    public function update(Request $request, $id)
    {
        try {
            // Buscar la habitación
            $habitacion = Habitacion::findOrFail($id);

            // Validación mejorada
            $validator = Validator::make($request->all(), [
                'numero' => 'required|string|max:10|unique:habitacions,numero,' . $habitacion->id . ',id',
                'tipo' => 'required|in:simple,doble,matrimonial',
                'descripcion' => 'nullable|string|max:255',
                'precio_noche' => 'required|numeric|min:0',
                'estado' => 'nullable|in:disponible,ocupada,mantenimiento',
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

            // Procesar imagen si se subió una nueva
            $rutaImagenPublica = $habitacion->imagen; // Mantener imagen actual por defecto

            if ($request->hasFile('imagen')) {
                // Eliminar imagen anterior si existe
                if ($habitacion->imagen) {
                    // Mejorar el manejo de rutas
                    $rutaAnterior = str_replace(['/storage/', asset('/storage/')], '', $habitacion->imagen);
                    $rutaAnterior = ltrim($rutaAnterior, '/');

                    if (Storage::disk('public')->exists($rutaAnterior)) {
                        Storage::disk('public')->delete($rutaAnterior);
                    }
                }

                // Guardar nueva imagen
                $imagenFile = $request->file('imagen');
                $nombreArchivoImagen = uniqid('hab_') . '.' . $imagenFile->getClientOriginalExtension();
                $rutaImagen = $imagenFile->storeAs('imagenes_habitaciones', $nombreArchivoImagen, 'public');
                $rutaImagenPublica = Storage::url($rutaImagen);
            }

            // Preparar datos para actualizar
            $datosActualizar = [
                'numero' => $request->numero,
                'tipo' => $request->tipo,
                'descripcion' => $request->descripcion,
                'precio_noche' => $request->precio_noche,
                'capacidad' => $request->capacidad,
                'imagen' => $rutaImagenPublica,
            ];

            // Solo actualizar estado si se envía
            if ($request->has('estado') && !is_null($request->estado)) {
                $datosActualizar['estado'] = $request->estado;
            }

            // Actualizar habitación en BD
            $habitacion->update($datosActualizar);

            // Refrescar el modelo para obtener los datos actualizados
            $habitacion->refresh();

            return response()->json([
                'success' => true,
                'message' => 'Habitación actualizada correctamente',
                'data' => [
                    'id' => $habitacion->id,
                    'numero' => $habitacion->numero,
                    'tipo' => $habitacion->tipo,
                    'descripcion' => $habitacion->descripcion,
                    'precio_noche' => $habitacion->precio_noche,
                    'estado' => $habitacion->estado,
                    'capacidad' => $habitacion->capacidad,
                    'imagen_url' => $habitacion->imagen ? asset($habitacion->imagen) : null
                ]
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Habitación no encontrada'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al actualizar habitación: ' . $e->getMessage()
            ], 500);
        }
    }

    // Método para eliminar una habitación
    public function destroy($id)
    {
        try {
            $habitacion = Habitacion::findOrFail($id);

            // Eliminar imagen si existe
            if ($habitacion->imagen) {
                $rutaImagen = str_replace('/storage/', '', $habitacion->imagen);
                Storage::disk('public')->delete($rutaImagen);
            }

            $habitacion->delete();

            return response()->json([
                'success' => true,
                'message' => 'Habitación eliminada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al eliminar habitación: ' . $e->getMessage()
            ], 500);
        }
    }
}
