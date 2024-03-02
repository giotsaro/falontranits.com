<?php

namespace App\Http\Controllers\Api\SA;

use App\Http\Controllers\Controller;
use App\Models\ZIPcodeDont;
use App\Models\ZIPcode;
use App\Http\Requests\StoreZIPcodeDontRequest;
use App\Http\Requests\UpdateZIPcodeDontRequest;
use App\Http\Resources\ZipDoesNotExist;
use App\Http\Resources\ZipCodeRecource;
use Illuminate\Support\Facades\Storage;
use Exception;
use Illuminate\Support\Facades\DB;

class ZIPcodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ZipDoesNotExist::collection(ZIPcodeDont::query()->orderBy('created_at', 'asc')->paginate(1000));
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
    public function store(StoreZIPcodeDontRequest $request)
    {
            $data = $request->validated();

    try {
        ZIPcode::create($data);
        
        $zipCodeToDelete = $data['zip_code'];
      
        DB::table('zipnotexist')->where('zip_code', $zipCodeToDelete)->delete();
    } 
    
    
    
    catch (Exception $e) {
        Storage::put('file.txt', json_encode($e));

    }
        

            return response()->json(['message' => 'Zip code stored successfully'], 200);
            //return response(new ZipCodeRecource($newzip) , 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ZIPcodeDont $zIPcodeDont)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ZIPcodeDont $zIPcodeDont)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateZIPcodeDontRequest $request, ZIPcodeDont $zIPcodeDont)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ZIPcodeDont $zIPcodeDont)
    {
        try {
        Storage::put('file.txt', json_encode($zIPcodeDont));
        $zIPcodeDont->delete();
    }
         catch (Exception $e) {
        
            Storage::put('file.txt', json_encode($e));
            return response()->json(['message' => 'Zip code deleted failed'], 203);
        }

        return response()->json(['message' => 'Zip code :) deleted successfully'], 200);
  }


}
            
    // Delete the specified zip code
 //   Storage::put('file.txt', json_encode($zipcode));
   // $zipcode->delete();
    
    // Return a success response
    //return response()->json(['message' => 'Zip code deleted successfully'], 200);
