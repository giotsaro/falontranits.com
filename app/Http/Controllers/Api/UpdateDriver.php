<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EditDriverRecource;
use App\Models\editdriver;
use App\Http\Requests\UpdateeditdriverRequest;
use App\Models\ZIPcode;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Exception;


class UpdateDriver extends Controller
{
    

    public function __invoke(UpdateeditdriverRequest $request, editdriver $editdriver)
    {
        try {
     
            $data = $request->validated();
            //Storage::put('file.txt',json_encode($data['comments']));
    
               //comment update
            $editdriver['comments']=$data['comments'];
    
                //zip update
            $opss = ZIPcode::where('zip_code', $data['zip'])->select('city', 'county', 'state_id','LAT','LNG')->first(); // Use first() to get a single result
            if ($opss) {
                // Assuming $opss is an object with properties city, county, and state_id
                $data['location'] = $opss->city . ' ' . $opss->county . ' ' . $opss->state_id;
                $data['LAT'] = $opss->LAT;
                $data['LNG'] = $opss->LNG;
            } else {
                // Handle the case where no data is found for the provided ZIP code
                Storage::put('file.txt', 'Location not available');
            }
    
    
    
        
    
               
    
    
              } catch (Exception $e) {
                Storage::put('error.txt',json_encode($e));
              }
             
    
            return new EditDriverRecource($editdriver);
    }




}
