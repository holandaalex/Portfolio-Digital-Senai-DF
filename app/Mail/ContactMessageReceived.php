<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

/**
 * Mensagem enviada pelo formulário "Entre em contato".
 */
class ContactMessageReceived extends Mailable
{
    /**
     * @param  array{nome: string, email: string, telefone: string, mensagem: string}  $data
     */
    public function __construct(public readonly array $data) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "💬 {$this->data['nome']} quer conversar com o SENAI DF",
            replyTo: [new Address($this->data['email'], $this->data['nome'])],
        );
    }

    public function content(): Content
    {
        return new Content(markdown: 'mail.contact');
    }
}
