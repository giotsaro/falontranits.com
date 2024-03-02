<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Company;


class AdminUserController extends Controller
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
    ->paginate(20);
                                                                    //asc                     
        return UserResource::collection($users);
    
    }

      
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
   
    public function update(UpdateUserRequest $request, User $user)
    {

        $companyId = $user->company_id;
        $userEmail = $user->email;
       
    
        // Retrieve the creator of the company
        $creator = Company::where('id', $companyId)->value('creator');


        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        if($userEmail!==$creator){
        $user->update($data);
        $user->save();
        }


        return new UserResource($user);
    } 

   
    public function destroy(User $user)
    {
        // Get the company id and email from the user
        $companyId = $user->company_id;
        $userEmail = $user->email;
        $himself = Auth::user()->id;
    
        // Retrieve the creator of the company
        $creator = Company::where('id', $companyId)->value('creator');
    
        // Check if the user is not the creator of the company
        if ($userEmail !== $creator && $user->id !== $himself) {
            // Perform actions if the user is not the creator or himself
            $user['isactive']=0;
            $user['remember_token']=null;
          
            $user->save();
           // Storage::put('file.txt', json_encode($user));
    
            // Return a success response
            return response('', 204);
        } else {
            Storage::put('file.txt', json_encode('creator'));
            // Return a response indicating that the user is the company creator
            return response()->json(['message' => 'you can not deactivate creator User or yourself'], 403);
        }
    }




}
