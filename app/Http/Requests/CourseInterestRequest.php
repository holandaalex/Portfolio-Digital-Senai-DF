<?php

namespace App\Http\Requests;

use App\Enums\Shift;
use Illuminate\Validation\Rule;

/**
 * Cadastro de interesse em um curso (modal da página de detalhe do curso).
 */
class CourseInterestRequest extends PublicFormRequest
{
    protected function fieldRules(): array
    {
        return [
            'curso' => ['required', 'string', 'max:200'],
            'area' => ['nullable', 'string', 'max:120'],
            'nome' => ['required', 'string', 'max:120'],
            'telefone' => ['required', 'string', 'max:30'],
            'telefoneAlternativo' => ['nullable', 'string', 'max:30'],
            'email' => ['required', 'email', 'max:160'],
            'turno' => ['required', Rule::enum(Shift::class)],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'telefoneAlternativo' => 'telefone (opção 2)',
        ];
    }
}
