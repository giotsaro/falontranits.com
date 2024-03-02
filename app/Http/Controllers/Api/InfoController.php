<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Info;
use App\Http\Requests\StoreInfoRequest;
use App\Http\Requests\UpdateInfoRequest;

use App\Models\Company;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class InfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $company = Company::where('id',$user->company_id)->first();

        $driverscount = Driver::where('isactive', true)
        ->where('company_id', $user->company_id)
        ->count();

        $userscount = User::where('isactive', true)
            ->where('company_id', $user->company_id)
            ->count();

      $company['drivers_count'] = $driverscount;
      $company['users_count'] = $userscount;
      // Storage::put('file.txt', json_encode($company));

      return response()->json(compact('user', 'company'));
    
       
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInfoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Info $info)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInfoRequest $request, Info $info)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Info $info)
    {
        //
    }
}
