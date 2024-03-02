<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;



class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


    $users = User::query()
    ->where('company_id', '=', Auth::user()->company_id)
    ->where('isactive', '=', true)  // Check if 'isactive' is true
    ->orderBy("id", "desc")
    ->paginate(200);
                                                                    //asc                     
        return UserResource::collection($users);
    
    }

       /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
     /** @var \App\Models\User $user */
     public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = Auth::user();
        $data['company_id'] = Auth::user()->company_id;
        /** @var \App\Models\User $user */
        $user = User::create($data);
        
        return response(new UserResource($user) , 201);
    } 

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {

     
        return new UserResource($user);
    } 
    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User                     $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

       
        $user->update($data);

        return new UserResource($user);
    } 

     /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        // Get the company id and email from the user
        $companyId = $user->company_id;
        $userEmail = $user->email;
    
        // Retrieve the creator of the company
        $creator = Company::where('id', $companyId)->value('creator');
    
        // Check if the user is not the creator of the company
        if ($userEmail !== $creator) {
            // Perform actions if the user is not the creator
            // For example, deactivate the user's account
             $user->update([
                'isactive' => 0,
                'remember_token' => null
            ]); 
           // Storage::put('file.txt', json_encode('waishala'));
    
            // Return a success response
            return response('', 204);
        } else {
           // Storage::put('file.txt', json_encode('creator'));
            // Return a response indicating that the user is the company creator
            return response()->json(['message' => 'The user is the company creator'], 403);
        }
    }
}
//$user['isactive']=0;
//$user['remember_token']=null;
//$user->update(['isactive' => 0]);
//Storage::put('file.txt', json_encode($driver));

