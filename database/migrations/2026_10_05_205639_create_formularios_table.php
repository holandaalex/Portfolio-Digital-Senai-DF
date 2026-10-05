<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('formularios', function (Blueprint $table) {
            $table->id();
            $table->string('tipo'); // contato, interesse_curso, jovem_aprendiz
            $table->string('nome');
            $table->string('email')->nullable();
            $table->string('telefone')->nullable();
            $table->text('mensagem')->nullable();
            $table->foreignId('curso_id')->nullable()->constrained('cursos')->nullOnDelete();
            $table->string('status')->default('novo'); // novo, lido, respondido
            $table->json('dados_adicionais')->nullable(); // JSON para campos dinâmicos
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('formularios');
    }
};
