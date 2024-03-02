<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Zipnotexist;
use App\Models\ZIPcode;
use App\Http\Requests\StoreZIPcodeRequest;
use App\Http\Requests\UpdateZIPcodeRequest;
use App\Http\Resources\ZipDoesNotExist;
use App\Http\Resources\ZipCodeRecource;
use Illuminate\Support\Facades\Storage;
use Exception;

class ZipCodeController extends Controller
{

    /**
     * 
     * Display a listing of the resource.
     * @retur \Illuminate\Http\Resources\Json\AnonymouseResourceCollection
     */
    public function index()
    {
        return ZipDoesNotExist::collection(Zipnotexist::query()->orderBy('created_at', 'asc')->paginate(1000));
    }

   
   /*  public function store(StoreZIPcodeRequest $request)
    {
        $data= $request->validated();
        $zipcode=ZIPcode::create($data);

        return  new ZipCodeRecource($zipcode);
    } */

    /**
     * Display the specified resource.
     */
   /*  public function show(Zipnotexist $zipcode)
    {
        Storage::put('file.txt', json_encode($zipcode));
        return new ZipCodeRecource($zipcode);
    } */

    /**
     * Update the specified resource in storage.
     */
   /*  public function update(UpdateZIPcodeRequest $request, Zipnotexist $zipcode)
    {
         $data =  $request->validated();
         $zipcode->update($data);

         return new ZipCodeRecource($zipcode);
    }
 */
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zipnotexist $zipcode)

    {   
        try {

            
            // Delete the specified zip code
            Storage::put('file.txt', json_encode($zipcode));
            $zipcode->delete();
            
            // Return a success response
            return response()->json(['message' => 'Zip code deleted successfully'], 200);
        } catch (Exception $e) {
            // Handle any exceptions that occur during deletion
            Storage::put('file.txt', json_encode($e));
           // return response()->json(['message' => 'Failed to delete zip code', 'error' => $e->getMessage()], 500);
        }




      
      //  $zipcode->delete();
       
      //  return response('',204);

    }
}
