<?php

use App\Http\Controllers\AutoCompleteController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::middleware(["auth", 'role:Super Admin'])->group(function () {
    Route::apiResource('users', UserController::class)->middleware('role: Super Admin');

    Route::get('autocomplete/{type}', [AutoCompleteController::class, 'autocomplete']);
    Route::post('autocomplete/{type}', [AutoCompleteController::class, 'autocomplete']);
});

require __DIR__ . '/auth.php';
