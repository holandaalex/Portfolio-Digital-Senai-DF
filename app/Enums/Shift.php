<?php

namespace App\Enums;

/**
 * Turnos oferecidos no cadastro de interesse em cursos.
 */
enum Shift: string
{
    case Morning = 'matutino';
    case Afternoon = 'vespertino';
    case Evening = 'noturno';

    public function label(): string
    {
        return match ($this) {
            self::Morning => 'Matutino',
            self::Afternoon => 'Vespertino',
            self::Evening => 'Noturno',
        };
    }
}
