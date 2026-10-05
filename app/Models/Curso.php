<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $fillable = [
        'nome',
        'area',
        'descricao',
        'duracao',
        'modalidade',
        'turno',
        'requisitos',
        'perfil',
        'imagem',
        'nivel'
    ];
}
