<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleReserva extends Model
{
    use HasFactory;

    protected $table = 'detalles_reservas'; // <--- Agrega esta línea

    protected $fillable = [
        'reserva_id',
        'user_id',
        'nombres_personas',
        'metodo_pago',
        'telefono',
        'documento',
    ];

    public function reserva()
    {
        return $this->belongsTo(Reserva::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
