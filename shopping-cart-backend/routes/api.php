<?php

use App\Http\Controllers\Apis\CartController;
use App\Http\Controllers\Apis\ProductController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
});

Route::controller(ProductController::class)->prefix('products')->group(function () {
    Route::get('/', 'index');
    Route::get('/{product_id}', 'show');
    Route::post('/', 'search');
});

// Protected routes
Route::middleware('auth:api')->group(function() {
    Route::controller(AuthController::class)->group(function () {
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
    });

    Route::controller(CartController::class)->prefix('cart')->group(function () {
        Route::get('/{userId}', 'index');
        Route::post('/', 'store');
        Route::post('/update', 'updateQty');
        Route::delete('/removeitem', 'destroyACartItem');
        Route::post('/checkout', 'checkout');
        Route::delete('/remove/{cartId}', 'destroy');
    });
});
