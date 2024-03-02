<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\ZIPcode;

use App\Http\Requests\StoreDriverRequest;
use App\Http\Requests\UpdateDriverRequest;
use App\Http\Resources\DriversManagerResources;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use Exception;


class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index( )
    {

        return DriversManagerResources::collection(Driver::query()->where('company_id', '=', Auth::user()->company_id)->where('isactive', '=','1')->orderBy('id', 'desc')->paginate(1000));
        
    }

  


    /**
     * Store a newly created resource in storage.
     */
     public function store(StoreDriverRequest $request)
    {
        
        try {

            $data = $request->validated();

             $data['company_id'] = Auth::user()->company_id;
            $data['reserved']='0';
            $data['reserved_by']='';
            $data['creator']= Auth::user()->id;
            $opss = ZIPcode::where('zip_code', $data['zip'])->select('city', 'county', 'state_id','LAT','LNG')->first(); // Use first() to get a single result
            if ($opss) {
                // Assuming $opss is an object with properties city, county, and state_id
                $data['location'] = $opss->city . ' ' . $opss->county . ' ' . $opss->state_id;
                $data['LAT'] = $opss->LAT;
                $data['LNG'] = $opss->LNG;
            } else {
                $data['location'] ='unknown';
                // Handle the case where no data is found for the provided ZIP code
               // Storage::put('file.txt', 'Location not available');
            }


            $driver = Driver::create($data);

            
            return new DriversManagerResources($driver); 
           // return response(new DriverResource($driver) , 201);
          //  Storage::put('file.txt',json_encode($data));

        } catch (Exception $e) {
            Storage::put('error.txt',json_encode($e));
          }

    }
 
    /**
     * Display the specified resource.
     */
    public function show(Driver $driver)
    {
        return new DriversManagerResources($driver);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDriverRequest $request, Driver $driver)
    {
        try {
     
        $data = $request->validated();
       // Storage::put('file.txt',json_encode($data));

           //comment update
       // $driver['comments']=$data['comments'];

             

            //zip update
        $opss = ZIPcode::where('zip_code', $data['zip'])->select('city', 'county', 'state_id','LAT','LNG')->first(); // Use first() to get a single result
        if ($opss) {
            // Assuming $opss is an object with properties city, county, and state_id
            $data['location'] = $opss->city . ' ' . $opss->county . ' ' . $opss->state_id;
            $data['LAT'] = $opss->LAT;
            $data['LNG'] = $opss->LNG;
        } else {
            // Handle the case where no data is found for the provided ZIP code
            //Storage::put('file.txt', 'Location not available');
            $data->location='unknown';
        }
           $driver->update($data);

           
          // Storage::put('file.txt',json_encode($data));

          } catch (Exception $e) {
            Storage::put('error.txt',json_encode($e));
          }
         

        return new DriversManagerResources($driver);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver)
    {
      
              $driver['isactive']=0;
            
              $driver->update(['isactive' => 0]);
            return response('', 204);
        
       
    }
}
