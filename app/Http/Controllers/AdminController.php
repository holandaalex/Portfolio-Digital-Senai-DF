<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formulario;
use App\Models\Curso;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function metrics()
    {
        $today = Carbon::today();

        return response()->json([
            'novos_formularios' => Formulario::where('status', 'novo')->count(),
            'cursos_ativos' => 0, // Cursos virão de outra tabela ou arquivo por enquanto
            'acessos_hoje' => Formulario::whereDate('created_at', $today)->count(),
        ]);
    }

    public function formularios(Request $request)
    {
        $query = Formulario::query()->orderBy('created_at', 'desc');

        if ($request->has('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->paginate(15));
    }
}
