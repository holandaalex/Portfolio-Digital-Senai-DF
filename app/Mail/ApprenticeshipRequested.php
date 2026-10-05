<?php

namespace App\Mail;

use App\Enums\SenaiUnit;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

/**
 * Solicitação de empresa interessada no programa Jovem Aprendiz.
 */
class ApprenticeshipRequested extends Mailable
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function __construct(public readonly array $data) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "🏭 {$this->data['razaoSocial']} quer formar {$this->data['vagas']} Jovem(ns) Aprendiz(es)",
            replyTo: [new Address($this->data['email'], $this->data['nome'])],
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.apprenticeship',
            with: ['unidade' => SenaiUnit::from($this->data['unidade'])->label()],
        );
    }
}
