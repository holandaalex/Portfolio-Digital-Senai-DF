<?php

namespace App\Enums;

/**
 * Unidades SENAI DF disponíveis no formulário de Jovem Aprendiz.
 */
enum SenaiUnit: string
{
    case Taguatinga = 'taguatinga';
    case Gama = 'gama';
    case Sobradinho = 'sobradinho';
    case Sig = 'sig';

    public function label(): string
    {
        return match ($this) {
            self::Taguatinga => 'SENAI Taguatinga',
            self::Gama => 'SENAI Gama',
            self::Sobradinho => 'SENAI Sobradinho',
            self::Sig => 'SENAI SIG',
        };
    }
}
