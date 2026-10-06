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
        return response()->json([
            'total_formularios' => Formulario::count(),
            'jovem_aprendiz' => Formulario::where('tipo', 'jovem_aprendiz')->count(),
            'interesse_curso' => Formulario::where('tipo', 'interesse_curso')->count(),
            'contatos' => Formulario::where('tipo', 'contato')->count(),
        ]);
    }

    public function formularios(Request $request)
    {
        $query = Formulario::query()->orderBy('created_at', 'desc');

        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->paginate(15));
    }
}
