<?php

namespace App\Http\Requests;

use App\Enums\SenaiUnit;
use Illuminate\Validation\Rule;

/**
 * Formulário de interesse de empresas no programa Jovem Aprendiz.
 */
class ApprenticeshipRequest extends PublicFormRequest
{
    protected function fieldRules(): array
    {
        return [
            'razaoSocial' => ['required', 'string', 'max:160'],
            'cnpj' => ['required', 'string', 'max:20'],
            'nome' => ['required', 'string', 'max:120'],
            'cargo' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'telefone' => ['required', 'string', 'max:30'],
            'unidade' => ['required', Rule::enum(SenaiUnit::class)],
            'vagas' => ['required', 'integer', 'min:1', 'max:999'],
            'cursos' => ['nullable', 'string', 'max:500'],
            'mensagem' => ['nullable', 'string', 'max:5000'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'razaoSocial' => 'razão social',
            'cnpj' => 'CNPJ',
            'vagas' => 'quantidade de vagas',
            'cursos' => 'cursos de interesse',
        ];
    }
}
