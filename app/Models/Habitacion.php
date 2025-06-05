<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Habitacion extends Model
{
      protected $table = 'habitacions';
    protected $primaryKey = 'id';

    protected $fillable = [
        'numero',
        'tipo',
        'descripcion',
        'precio_noche',
        'estado',
        'capacidad',
        'imagen'
    ];
     public function getUrlImagenAttribute(): string
    {
        return $this->imagen ? asset($this->imagen) : '';
    }
}
