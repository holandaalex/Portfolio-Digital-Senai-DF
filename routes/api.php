<?php

use App\Http\Controllers\FormSubmissionController;
use Illuminate\Support\Facades\Route;

// Grupo de rotas responsável por receber os envios dos formulários do frontend (React)
Route::prefix('formularios')
    ->middleware('throttle:forms') // Proteção anti-spam: limita a quantidade de envios por minuto
    ->controller(FormSubmissionController::class) // Define que todas as rotas abaixo usarão este controlador
    ->name('forms.')
    ->group(function () {
        // Cada rota corresponde a um formulário específico no frontend
        Route::post('contato', 'contact')->name('contact'); // Formulário de contato geral
        Route::post('jovem-aprendiz', 'apprenticeship')->name('apprenticeship'); // Formulário de Jovem Aprendiz
        Route::post('interesse-curso', 'courseInterest')->name('course-interest'); // Modal de interesse em cursos
    });
