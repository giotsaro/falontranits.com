<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DistanceRequest;
use App\Models\Driver;
use App\Models\ZIPcode;
use App\Models\ZIPcodeDont;
use App\Http\Resources\DriverResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Exception;



class GetDriverController extends Controller
{
    public function __invoke(DistanceRequest $request)
    {
        $validated = $request->validated();
         $fromzipcode =  $validated['zipcode'];
         $range = $validated['range'];

        if( $fromzipcode!==null){

            if($this->checkzipcode($fromzipcode)){
                 // The ZIP Code record  exist

                 $drivers = DriverResource::collection(
                    Driver::query()
                        ->orderBy("updated_at")
                        ->where('isactive', '=', true) 
                        ->where('company_id', Auth::user()->company_id)->paginate(1000)
                );
               // Storage::append('file.txt', json_encode($drivers));

               // Storage::put('file.txt', '1' );
                $origin = ZIPcode::where('zip_code', $fromzipcode)->first();
                $earthRadius =  $miles = 3963.19;
                $lat1 = $origin->LAT;
                $lng1 = $origin->LNG;

              //  Storage::append('file.txt', json_encode($origin));


              $location[] = $origin->city . ' ' . $origin->county . ' ' . $origin->state_id . ' ';



              
                foreach ($drivers as $driver) {
                    $lat2 = $driver->LAT;
                    $lng2 = $driver->LNG;
                    $distance = $this->calculateDistance($lat1, $lng1, $lat2, $lng2, $earthRadius);
                    
                    //Storage::append('file.txt', json_encode($range));
                    $driver->distance=$distance;
                    
                }

                 $sortedDrivers= $drivers->sortBy('distance');
                   // Storage::append('file.txt', json_encode($drivers));

                   if ($range !== null) {
                    $filteredDrivers = $sortedDrivers->filter(function ($driver) use ($range) {
                        return $driver->distance <= $range;
                    });
                
                    // If you want to get the filtered drivers as a new array
                    $filteredDrivers = $filteredDrivers->all();
  
               //  $theend = DriverResource::collection($filteredDrivers);

                  //  return response(compact('theend','location'));    
                    return   DriverResource::collection($filteredDrivers);
                }

                    
                     $data = DriverResource::collection($sortedDrivers);

                     return response(compact('data','location'));    

             //  return DriverResource::collection($sortedDrivers);
               //Storage::append('file.txt', $drivers);


            }else{
                 // The ZIP Code record does not exist

                 try {
                    $exists = ZIPcodeDont::where('zip_code', $fromzipcode)->exists();
                    $existsString = $exists ? 'true' : 'false';
                    
                    
                   // Storage::append('file.txt', json_encode($existsString));
                
                    if (!$exists) {
                        $user = Auth::user();
                        ZIPcodeDont::create([
                            'zip_code' => $fromzipcode,
                            'request_by' => $user->email,
                            'company_id' => $user->company_id,
                        ]);
                    }
                } catch (Exception $e) {
                    Storage::append('error_log.txt', json_encode($e));
                    // You can log the exception or perform other error handling actions
                }
                
                
                $data = $this->driversonly();
                return  DriverResource::collection($data);
            }
          


        }else{

           // Storage::put('file.txt', 'empty' );
            $data = $this->driversonly();

            return DriverResource::collection($data);
            
        }


    }

   

    private function driversonly (){

               $drivers = DriverResource::collection(
            Driver::query()
                ->orderBy("id", "desc")
                ->where('company_id', Auth::user()->company_id)
                ->where('isactive', '=', true) 
                ->paginate(100)
        );

        return $drivers;
    }

    private function checkzipcode($fromzipcode){

        if ($exist = ZIPcode::where('zip_code', $fromzipcode)->exists()) {

                return $exist;
              }

            }

            private function calculateDistance($lat1, $lng1, $lat2, $lng2, $earthRadius)
            {
                // Convert latitude and longitude from degrees to radians
            $lat1Rad = deg2rad($lat1);
            $lng1Rad = deg2rad($lng1);
            $lat2Rad = deg2rad($lat2);
            $lng2Rad = deg2rad($lng2);
        
            // Calculate the differences between coordinates
            $latDiff = $lat2Rad - $lat1Rad;
            $lngDiff = $lng2Rad - $lng1Rad;
        
            // Haversine formula
            $a = sin($latDiff / 2) * sin($latDiff / 2) +
                 cos($lat1Rad) * cos($lat2Rad) *
                 sin($lngDiff / 2) * sin($lngDiff / 2);
            $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        
            // Calculate the distance in miles
            $distance = $earthRadius * $c;
        
            $distance = round($distance, 0);
                return $distance;
            }

}

  
   