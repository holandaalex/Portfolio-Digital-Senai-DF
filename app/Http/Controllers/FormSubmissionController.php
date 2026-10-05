<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApprenticeshipRequest;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\CourseInterestRequest;
use App\Mail\ApprenticeshipRequested;
use App\Mail\ContactMessageReceived;
use App\Mail\CourseInterestRegistered;
use Illuminate\Http\JsonResponse;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;

/**
 * Este controlador é responsável por receber os dados dos formulários enviados
 * pelo frontend (React), validar as informações e enviar os e-mails para a
 * equipe do SENAI.
 */
class FormSubmissionController extends Controller
{
    /**
     * Recebe e processa o formulário de Contato Geral
     * 
     * @param ContactRequest $request Valida os dados antes de entrar neste método
     */
    public function contact(ContactRequest $request): JsonResponse
    {
        return $this->deliver(
            new ContactMessageReceived($request->payload()),
            'Mensagem enviada! Nossa equipe retornará em breve.',
        );
    }

    /**
     * Recebe e processa o formulário de solicitação para Jovem Aprendiz
     */
    public function apprenticeship(ApprenticeshipRequest $request): JsonResponse
    {
        return $this->deliver(
            new ApprenticeshipRequested($request->payload()),
            'Solicitação recebida! Um consultor entrará em contato em até 48 horas úteis.',
        );
    }

    /**
     * Recebe e processa o formulário de cadastro de interesse em cursos (Modal)
     */
    public function courseInterest(CourseInterestRequest $request): JsonResponse
    {
        return $this->deliver(
            new CourseInterestRegistered($request->payload()),
            'Cadastro realizado! Avisaremos você quando abrirem novas turmas.',
        );
    }

    /**
     * Método auxiliar (reutilizável) que dispara o e-mail e retorna a resposta padrão para o React
     * 
     * @param Mailable $mail A classe de e-mail que será enviada
     * @param string $message A mensagem de sucesso que aparecerá na tela do usuário
     */
    private function deliver(Mailable $mail, string $message): JsonResponse
    {
        // Envia o e-mail para o destinatário configurado em config/forms.php
        Mail::to(config('forms.recipient'))->send($mail);

        // Retorna um JSON para o frontend (React) saber que deu tudo certo
        return response()->json(['message' => $message]);
    }
}
