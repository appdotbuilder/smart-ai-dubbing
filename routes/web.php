<?php

use App\Http\Controllers\DubbingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Dubbing routes - available to all users (including guests)
Route::controller(DubbingController::class)->group(function () {
    Route::post('/dubbing', 'store')->name('dubbing.store');
    Route::get('/dubbing/{id}', 'show')->name('dubbing.show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $jobs = auth()->user()->dubbingJobs()->latest()->take(20)->get();
        
        return Inertia::render('dashboard', [
            'jobs' => $jobs
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
