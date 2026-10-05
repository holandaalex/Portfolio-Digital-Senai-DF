<x-mail::message>
# Uma nova conversa começou! 💬

**{{ $data['nome'] }}** passou pelo Portal SENAI DF e deixou uma mensagem para a nossa equipe:

<x-mail::panel>
{!! nl2br(e($data['mensagem'])) !!}
</x-mail::panel>

- **E-mail:** {{ $data['email'] }}
- **Telefone:** {{ $data['telefone'] }}

Quanto mais rápido o retorno, maior a chance de transformar essa curiosidade em matrícula. Responda este e-mail e a resposta vai direto para {{ $data['nome'] }}. 🚀

<x-mail::button :url="'mailto:'.$data['email']">
Responder agora
</x-mail::button>

Enviado automaticamente pelo {{ config('app.name') }}.
</x-mail::message>
