<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		return inertia()->render('Profile/Index');
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request)
	{
		if ($request->new_password) {
			$request->validate([
				'new_password' => ['required', 'string', 'min:8', 'confirmed']
			]);

			$data['password'] =  Hash::make($request->new_password);
		}

		$request->validate([
			'name' => ['required', 'string', 'max:255'],
			'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . auth()->user()->id],
			'password' => ['required', 'string']
		]);

		// check hashed password
		if (!Hash::check($request->password, auth()->user()->password)) {
			return back()->withErrors(['password' => 'Password salah!']);
		}

		$data['name'] = $request->name;
		$data['email'] = $request->email;
		User::whereId(auth()->user()->id)->first()->update($data);

		return redirect(route('profile.index'))->withSuccess('Profile updated successfully');
	}
}
