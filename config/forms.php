<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Destinatário dos formulários
    |--------------------------------------------------------------------------
    |
    | Caixa de entrada que recebe todos os formulários públicos do portal
    | (contato, Jovem Aprendiz e cadastro de interesse em cursos).
    |
    */

    'recipient' => env('FORMS_RECIPIENT', 'contato@alexholanda.com.br'),

    /*
    |--------------------------------------------------------------------------
    | Limite de envios (anti-spam)
    |--------------------------------------------------------------------------
    |
    | Quantidade máxima de envios por minuto, por endereço IP.
    |
    */

    'rate_limit' => (int) env('FORMS_RATE_LIMIT', 5),

];
