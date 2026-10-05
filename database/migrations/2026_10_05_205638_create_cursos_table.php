<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cursos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('area');
            $table->text('descricao')->nullable();
            $table->string('duracao')->nullable();
            $table->string('modalidade')->nullable();
            $table->string('turno')->nullable();
            $table->text('requisitos')->nullable();
            $table->text('perfil')->nullable();
            $table->string('imagem')->nullable();
            $table->string('nivel')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cursos');
    }
};
