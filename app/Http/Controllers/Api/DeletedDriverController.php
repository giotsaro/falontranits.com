<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use  Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\DriverResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdateeditdriverRequest;
use Illuminate\Support\Facades\DB;


class DeletedDriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DriverResource::collection(Driver::query()->where('company_id', '=', Auth::user()->company_id)->where('isactive', '=','0')->orderBy('id', 'desc')->paginate(1000));
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
    public function store(UpdateeditdriverRequest $request)
    {
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
    public function edit()
    {
        
     
   
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateeditdriverRequest $request)
{

    $data = $request->validated();
    $id = $data['id'];
    $driver = Driver::find($id);
    //Storage::put('file.txt', json_encode($driver));
    if ($driver) {
        $driver->update(['isactive' => 1]);
        // Storage::put('file.txt', json_encode($driver));
        $driver->save();
        return response()->json(['message' => 'Driver details stored successfully'], 200);
    } else {
       // Storage::put('file.txt', json_encode('error'));
        // If the driver is not found, return a 404 response
        return response()->json(['message' => 'Driver not found'], 404);
    }
}


    /**
     * 
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver)
    {
        $driver->delete();
    
        return response()->json(['message' => 'Driver deleted successfully'], 200);
    }
}
