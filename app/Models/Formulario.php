<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formulario extends Model
{
    protected $fillable = [
        'tipo', // 'contato', 'interesse_curso', 'jovem_aprendiz'
        'nome',
        'email',
        'telefone',
        'mensagem',
        'curso_id', // opcional
        'status', // 'novo', 'lido', 'respondido'
        'dados_adicionais' // json para campos extras como data de nascimento, bairro, etc.
    ];

    protected $casts = [
        'dados_adicionais' => 'array'
    ];
}
