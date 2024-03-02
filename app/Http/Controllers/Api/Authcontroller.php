<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Resources\CompanyRecources;
use App\Models\User;
use App\Models\Company;
use App\Models\Driver;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
{   
    // Validate the incoming request data
    $data = $request->validate([
        'name' => 'required|string',
        'email' => 'required|string|email|unique:users,email|unique:companies,email',
        'password' => 'required|string',
        'company' => 'required|string',
    ]);

    // Create the company
    $company = Company::create([
        'company' => $data['company'],
        'email' => $data['email'], // Assuming 'creator' is a column in your companies table
        'creator' => $data['email'], // Assuming 'creator' is a column in your companies table
        'credited' => '1',
        'credited_until' => Carbon::now()->addDays(5),
    ]);

    // Create the user with the assigned company_id
    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => bcrypt($data['password']),
        'role' => 1,
        'company_id' => $company->id,
    ]);

    // Save both records
    $company->save();
    $user->save();
   
    // Create and return the token
    $token = $user->createToken('mainenneger')->plainTextToken;
    return response('login');
}


public function login(LoginRequest $request)
{
    $credentials = $request->validated();

    // Check if the user's account is active
    if ($user = User::where('email', $credentials['email'])->where('isactive', true)->first()) {
        // Attempt to authenticate the user
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Email or password is incorrect'], 422);
        }

        // If authentication is successful, create a token
        $token = $user->createToken('mainenneger')->plainTextToken;
        // Update the user's remember token
        $user->update(['remember_token' => $token]);

        
     



        return response()->json(compact('user', 'token'));
    } else {
        // If the user's account is not active, return an error message
        return response()->json(['message' => 'Your account is not active'], 422);
    }
}





    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->update(['remember_token' => null]);
       // $user->currentAccessToken()->delete();
        return response('', 204);
    }
}

