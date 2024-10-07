<?php

use App\Http\Controllers\{ProfileController, MapController, NotificationController};
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $satelliteIconUrl = asset('img/iconsatellite.svg');
    return Inertia::render('Dashboard', ['satelliteIconUrl' => $satelliteIconUrl]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/maps', [MapController::class, 'indexmap'])->name('map.indexmap');
Route::resource('/notifications', NotificationController::class);

require __DIR__.'/auth.php';
