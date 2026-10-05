<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;

/**
 * Base dos formulários públicos do portal.
 *
 * Centraliza o honeypot anti-spam e as mensagens de validação em português,
 * deixando para cada formulário apenas a definição dos seus próprios campos.
 */
abstract class PublicFormRequest extends FormRequest
{
    /** Campo invisível ao usuário: só robôs o preenchem. */
    public const HONEYPOT = 'website';

    /**
     * Regras específicas dos campos de cada formulário.
     *
     * @return array<string, mixed>
     */
    abstract protected function fieldRules(): array;

    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [...$this->fieldRules(), self::HONEYPOT => ['prohibited']];
    }

    /**
     * Dados validados (sem o honeypot), com todos os campos do formulário
     * presentes: opcionais não enviados chegam como null.
     *
     * @return array<string, mixed>
     */
    public function payload(): array
    {
        $fields = array_fill_keys(array_keys($this->fieldRules()), null);

        return [...$fields, ...Arr::except($this->validated(), self::HONEYPOT)];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'email' => 'Informe um e-mail válido.',
            'integer' => 'O campo :attribute deve ser um número inteiro.',
            'enum' => 'Selecione uma opção válida para :attribute.',
            'min.numeric' => 'O campo :attribute deve ser no mínimo :min.',
            'max.numeric' => 'O campo :attribute deve ser no máximo :max.',
            'max.string' => 'O campo :attribute deve ter no máximo :max caracteres.',
            'prohibited' => 'Não foi possível processar o envio.',
        ];
    }
}
