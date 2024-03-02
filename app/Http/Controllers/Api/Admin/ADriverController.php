<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ADriver;
use App\Http\Requests\admin\StoreADriverRequest;
use App\Http\Requests\admin\UpdateADriverRequest;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreDriverRequest;
use App\Http\Requests\UpdateDriverRequest;
use App\Http\Resources\DriverResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Exception;

class ADriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    /*     $drivers = DriverResource::collection(
            ADriver::query()
                ->orderBy("id", "desc")
                ->where('company_id', Auth::user()->company_id)
                ->paginate(100)
        );
    
        foreach ($drivers as $driver) {
            // Fetch location information for each driver
            $location = DB::table('usa_zips')
                ->where('zip_code', $driver->zip)
                ->select('city', 'county', 'state_id')
                ->first(); // Use first() to get a single result
    
            // Add location information to the driver
            $driver->location = $location
                ? $location->city . ' ' . $location->county . ' ' . $location->state_id
                : 'Location not available';
        }
        
   

      return $drivers; */
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
    /**
     * Store a newly created resource in storage.
     *
     */
     /** */
     public function store()
     {
         //
     }

   /**
     * Display the specified resource.
     *
    
     */
    public function show()
    {
        //return new DriverResource($driver);
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
     *
    
     */
    public function update()
    {
      /*   try {
     
        $data = $request->validated();
        //Storage::put('file.txt',json_encode($data['comments']));

           //comment update
        $driver['comments']=$data['comments'];

            //zip update
        $opss = DB::table('usa_zips')->where('zip_code', $data['zip'])->select('city', 'county', 'state_id')->first(); // Use first() to get a single result
        if ($opss) {
            // Assuming $opss is an object with properties city, county, and state_id
            $data['location'] = $opss->city . ' ' . $opss->county . ' ' . $opss->state_id;
        } else {
            // Handle the case where no data is found for the provided ZIP code
            Storage::put('file.txt', 'Location not available');
        }



            //reservation  update
         /** @var \App\Models\User $user */
       /*  $user = Auth::user();  
        if($data['reserved']===1 ){
            $data['reserved_by'] = $user['name'];
           // Storage::put('file.txt',json_encode( $data));
            $driver->update($data);
        }
        if($data['reserved']===0 ){
          
                if( $driver['reserved_by']==$user['name']||$user['role']===1){
                        //   Storage::put('file.txt',json_encode( $user['name']));
                        $data['reserved_by']= '';
                        $driver->update($data);
                }
        }

           


          } catch (Exception $e) {
            Storage::put('error.txt',json_encode($e));
          }
         

        return new DriverResource($driver); */
    }

     /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy()
    {
        //
    }
}
