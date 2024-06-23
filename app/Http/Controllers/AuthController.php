<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\{
	RedirectResponse,
	Request
};
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
	public function login(Request $request)
	{
		return inertia()->render('Auth/Login');
	}

	public function loginStore(LoginRequest $request): RedirectResponse
	{
		$request->authenticate();

		$request->session()->regenerate();

		session()->flash('success', 'Login successful');
		return redirect()->intended(route('dashboard.index', absolute: false));
	}

	public function logout(Request $request): RedirectResponse
	{
		Auth::guard('web')->logout();

		$request->session()->invalidate();

		$request->session()->regenerateToken();

		session()->flash('success', 'Logout successful');
		return redirect('/');
	}
}
