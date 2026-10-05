<?php

namespace App\Http\Requests;

/**
 * Formulário "Entre em contato" (presente em todas as páginas principais).
 */
class ContactRequest extends PublicFormRequest
{
    protected function fieldRules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'telefone' => ['required', 'string', 'max:30'],
            'mensagem' => ['required', 'string', 'max:5000'],
        ];
    }
}
