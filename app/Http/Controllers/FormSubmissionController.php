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
    public function contact(ContactRequest $request): JsonResponse
    {
        $payload = $request->payload();
        
        \App\Models\Formulario::create([
            'tipo' => 'contato',
            'nome' => $payload['nome'],
            'email' => $payload['email'],
            'telefone' => $payload['telefone'],
            'mensagem' => $payload['mensagem'],
            'status' => 'novo'
        ]);

        return $this->deliver(
            new ContactMessageReceived($payload),
            'Mensagem enviada! Nossa equipe retornará em breve.',
        );
    }

    public function apprenticeship(ApprenticeshipRequest $request): JsonResponse
    {
        $payload = $request->payload();
        
        \App\Models\Formulario::create([
            'tipo' => 'jovem_aprendiz',
            'nome' => $payload['nome'],
            'email' => $payload['email'],
            'telefone' => $payload['telefone'],
            'mensagem' => $payload['mensagem'] ?? null,
            'dados_adicionais' => [
                'razaoSocial' => $payload['razaoSocial'],
                'cnpj' => $payload['cnpj'],
                'cargo' => $payload['cargo'],
                'unidade' => $payload['unidade'],
                'vagas' => $payload['vagas'],
                'cursos' => $payload['cursos'],
            ],
            'status' => 'novo'
        ]);

        return $this->deliver(
            new ApprenticeshipRequested($payload),
            'Solicitação recebida! Um consultor entrará em contato em até 48 horas úteis.',
        );
    }

    public function courseInterest(CourseInterestRequest $request): JsonResponse
    {
        $payload = $request->payload();

        \App\Models\Formulario::create([
            'tipo' => 'interesse_curso',
            'nome' => $payload['nome'],
            'email' => $payload['email'],
            'telefone' => $payload['telefone'],
            'dados_adicionais' => [
                'curso' => $payload['curso'],
                'area' => $payload['area'],
                'telefoneAlternativo' => $payload['telefoneAlternativo'],
                'turno' => $payload['turno']
            ],
            'status' => 'novo'
        ]);

        return $this->deliver(
            new CourseInterestRegistered($payload),
            'Cadastro realizado! Avisaremos você quando abrirem novas turmas.',
        );
    }

    private function deliver(Mailable $mail, string $message): JsonResponse
    {
        Mail::to(config('forms.recipient'))->send($mail);
        return response()->json(['message' => $message]);
    }
}
