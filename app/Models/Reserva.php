<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'habitacion_id',
        'fecha_inicio',
        'fecha_fin',
        'estado',
        'fecha_reserva',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function habitacion()
    {
        return $this->belongsTo(Habitacion::class, 'habitacion_id');
    }
}
