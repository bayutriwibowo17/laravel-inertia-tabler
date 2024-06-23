<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserCrudController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		$userQuery = User::query();

		$perPage = $request->per_page ?? 10;

		$userQuery->when(request('search'), function ($query, $search) {
			return $query->where('name', 'LIKE', '%' . $search . '%')
				->orWhere('email', 'LIKE', '%' . $search . '%');
		});

		$userQuery->when(request('sortField'), function ($query, $sortField) {
			return $query->orderBy($sortField, request('sortDirection') ? request('sortDirection') : 'asc');
		});

		$users = $userQuery->paginate($perPage)->appends($request->query());
		return inertia()->render('Admin/User/Index', compact('users'));
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request)
	{
		$data = $request->validate([
			'name' => ['required', 'string', 'max:255'],
			'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
			'password' => ['required', 'string', 'min:8', 'confirmed'],
		]);

		$data['password'] = Hash::make($request->password);

		User::create($data);

		return redirect()->route('admin.user.index')->withSuccess('User created successfully');
	}

	/**
	 * Display the specified resource.
	 */
	public function show(string $id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(string $id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, string $id)
	{
		if (!$user = User::whereId($id)->firstOrfail()) {
			return back()->withError('User not found!');
		}
		$data = $request->validate([
			'name' => ['required', 'string', 'max:255'],
			'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $id],
		]);

		if ($request->password) {
			$request->validate(['password' => $request->password ? ['required', 'string', 'min:8', 'confirmed'] : '']);
			$data['password'] = Hash::make($request->password);
		}

		$user->update($data);

		return back()->withSuccess('User update successfully!');
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(string $id)
	{
		if (!$user = User::whereId($id)->firstOrfail()) {
			return back()->withError('User not found!');
		}

		$user->delete();

		return back()->withSuccess('User deleted successfully!');
	}
}
