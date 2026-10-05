<x-mail::message>
# Tem gente de olho na próxima turma! 🎓

**{{ $data['nome'] }}** quer ser avisado(a) assim que abrirem novas turmas de:

<x-mail::panel>
**{{ $data['curso'] }}**
@if (filled($data['area']))
<br>Área: {{ $data['area'] }}
@endif
<br>Turno preferido: **{{ $turno }}**
</x-mail::panel>

- **E-mail:** {{ $data['email'] }}
- **Telefone:** {{ $data['telefone'] }}
@if (filled($data['telefoneAlternativo']))
- **Telefone (opção 2):** {{ $data['telefoneAlternativo'] }}
@endif

Interesse registrado é meio caminho andado para uma nova matrícula. Que tal um contato de boas-vindas? ✨

<x-mail::button :url="'mailto:'.$data['email']">
Entrar em contato
</x-mail::button>

Enviado automaticamente pelo {{ config('app.name') }}.
</x-mail::message>
