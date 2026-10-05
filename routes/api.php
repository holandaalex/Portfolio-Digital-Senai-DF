<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Rotas de Autenticação do Painel Administrativo
Route::post('/login', [AuthController::class, 'login']);

use App\Http\Controllers\AdminController;

// Rotas Protegidas do Painel Administrativo
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Rotas do Painel
    Route::get('/admin/metrics', [AdminController::class, 'metrics']);
    Route::get('/admin/formularios', [AdminController::class, 'formularios']);
});

// =======================================================
// ROTAS DE FORMULÁRIOS PÚBLICOS (SITE)
// =======================================================
Route::middleware('throttle:5,1')->group(function () {
    Route::post('/formularios/contato', [FormSubmissionController::class, 'contato']);
    Route::post('/formularios/aprendizagem', [FormSubmissionController::class, 'jovemAprendiz']);
    Route::post('/formularios/curso', [FormSubmissionController::class, 'cursoInteresse']);
});
