<?php

namespace App\Mail;

use App\Enums\Shift;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

/**
 * Cadastro de interesse em um curso (aviso de abertura de novas turmas).
 */
class CourseInterestRegistered extends Mailable
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function __construct(public readonly array $data) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "🎓 Novo interessado em {$this->data['curso']}",
            replyTo: [new Address($this->data['email'], $this->data['nome'])],
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.course-interest',
            with: ['turno' => Shift::from($this->data['turno'])->label()],
        );
    }
}
