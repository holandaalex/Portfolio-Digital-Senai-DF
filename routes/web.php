<?php

use Illuminate\Support\Facades\Route;

/*
| As páginas do portal são renderizadas pelo React Router (SPA).
| Qualquer URL fora de /api e /up entrega o mesmo shell Blade.
*/
Route::view('/{path?}', 'app')
    ->where('path', '(?!api(?:/|$)|up$).*')
    ->name('spa');
