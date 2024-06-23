<?php

use App\Http\Controllers\{
	AuthController,
	DashboardController,
	ProfileController
};
use App\Http\Controllers\Admin\UserCrudController;
use Illuminate\Support\Facades\Route;

Route::controller(DashboardController::class)->name('dashboard.')->middleware('auth')->group(function () {
	Route::get('/', 'index')->name('index');
});

Route::middleware('auth')->group(function () {
	Route::controller(ProfileController::class)->name('profile.')->prefix('/profile')->group(function () {
		Route::get('/', 'index')->name('index');
		Route::patch('/', 'update')->name('update');
	});
});

Route::middleware('auth')->prefix('/admin')->name('admin.')->group(function () {

	Route::controller(DashboardController::class)->name('dashboard.')->group(function () {
		Route::get('/', 'index')->name('index');
	});

	Route::controller(UserCrudController::class)->name('user.')->group(function () {
		Route::get('/user', 'index')->name('index');
		Route::post('/user', 'store')->name('store');
		Route::patch('/user/{id}/update', 'update')->name('update');
		Route::delete('/user/{id}/destroy', 'destroy')->name('destroy');
	});
});

Route::middleware('guest')->controller(AuthController::class)->group(function () {
	Route::get('/login', 'login')->name('login');
	Route::post('/login', 'loginStore')->name('login');
	Route::post('/logout', 'logout')->name('logout')->middleware('auth')->withoutMiddleware('guest');
});
