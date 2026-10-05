<x-mail::message>
# Mais uma indústria apostando no futuro! 🏭

A empresa **{{ $data['razaoSocial'] }}** quer abrir as portas para **{{ $data['vagas'] }}** jovem(ns) aprendiz(es) com o SENAI DF.

<x-mail::panel>
**Empresa:** {{ $data['razaoSocial'] }}<br>
**CNPJ:** {{ $data['cnpj'] }}<br>
**Unidade de preferência:** {{ $unidade }}<br>
**Vagas:** {{ $data['vagas'] }}<br>
**Cursos de interesse:** {{ $data['cursos'] ?: 'Não informado' }}
</x-mail::panel>

## Quem está à frente

- **Responsável:** {{ $data['nome'] }} ({{ $data['cargo'] }})
- **E-mail:** {{ $data['email'] }}
- **Telefone:** {{ $data['telefone'] }}

@if (filled($data['mensagem']))
## Observações

{!! nl2br(e($data['mensagem'])) !!}
@endif

Cada contrato de aprendizagem é uma carreira começando. Vamos dar o próximo passo com essa empresa! 🤝

<x-mail::button :url="'mailto:'.$data['email']">
Falar com a empresa
</x-mail::button>

Enviado automaticamente pelo {{ config('app.name') }}.
</x-mail::message>
