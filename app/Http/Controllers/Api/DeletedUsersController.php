<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RestoreUserRequest;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class DeletedUsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(User::query()->where('company_id', '=', Auth::user()->company_id)->where('isactive', '=','0')->orderBy('id', 'desc')->paginate(1000));


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
        //
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
    public function update(RestoreUserRequest $request)
    {
        $data = $request->validated();
        $id = $data['id'];
        $user = User::find($id);
       // Storage::put('file.txt', json_encode($user));
        if ($user) {
            $user->update(['isactive' => 1]);
            // Storage::put('file.txt', json_encode($user));
            $user->save();
            return response()->json(['message' => 'User details stored successfully'], 200);
        } else {
           // Storage::put('file.txt', json_encode('error'));
            // If the driver is not found, return a 404 response
            return response()->json(['message' => 'User not found'], 404);
        }




    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
