<?php

namespace App\Http\Controllers\Api\SA;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Models\User;
use App\Models\Company;
use App\Http\Resources\UserResource;
use App\Http\Resources\CompanyRecources;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use PharIo\Manifest\Email;

class SAController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
        
      //  $users = Company::collection()->orderBy('id', 'asc')->paginate(1000);
       // $drivers = Company::collection()->orderBy('id', 'asc')->paginate(1000);
       //$companies = Company::collection()->orderBy('id', 'asc')->paginate(1000);
      //  $companies = CompanyRecources::collection(Company::query()->orderBy('id', 'asc')->paginate(1000));
    
       
       // return CompanyRecources::collection(Company::query()->orderBy('id', 'asc')->paginate(1000));


       $companies = Company::query()
       ->orderBy("id", "desc")
       ->paginate(1000);

      // return response()->json(compact('companies'));
      //return  CompanyRecources($companies);
      return CompanyRecources::collection($companies);
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
    public function store(StoreCompanyRequest $request)
    {
        
        $data=$request->validated();
       
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

        $company->save();
        $user->save();




 Storage::put('file.txt', json_encode($data));


    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
     
     
     $company= new CompanyRecources($company);
        $us = User::query()
       ->where('company_id', '=',$company->id)
       ->where('isactive', '=', true)  // Check if 'isactive' is true
       ->orderBy("id", "desc")
       ->paginate(1000);
         $users=  UserResource::collection($us);
        return response()->json(compact('company','users'));
    
    
    }
  // Storage::put('file.txt', json_encode($company));
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
    public function update(UpdateCompanyRequest $request,Company $company)
    {
        $data = $request->validated();
       

       
        $company->update($data);
       // Storage::put('file.txt', json_encode($company));
            return new CompanyRecources($company);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
