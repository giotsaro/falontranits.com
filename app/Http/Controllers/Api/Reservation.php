<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\editdriver;
use App\Http\Requests\ReservationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;



class Reservation extends Controller
{
  

    public function __invoke(ReservationRequest $request){

        $data = $request->validated();

        $driverid=$data['id'];


        // Retrieve the driver by its ID or throw an exception if not found
    $currentDriver = EditDriver::where('id', $driverid)->firstOrFail();

    // Retrieve the current authenticated user
    $currentUser = Auth::user();

    // Check if the driver is reserved
    if ($currentDriver->reserved=='1') { 
          
    
    
         if ($this->hasaccess($currentUser) || $currentDriver->reservedid == $currentUser->id) {
        
            $currentDriver->reserved = '0';
            $currentDriver->reservedid = null;
            $currentDriver->reserved_by = '';
            //$message = 'Reservation cleared.';
            $currentDriver->save();
        } else {
         

            $message = 'Access denied. User does not have sufficient privileges to clear reservation.';
            Storage::put('file.txt', json_encode($message));
        } 

        
    }
     else  {
        // If the driver is not reserved, reserve it and assign it to the current user
        $currentDriver->reserved = '1';
        $currentDriver->reservedid = $currentUser->id;
        $currentDriver->reserved_by = $currentUser->name;
       // $message = 'Driver reserved by';
       // $message = $currentDriver->reserved;
        $currentDriver->save();
    }

    // Save the changes to the driver model
  

    // Log the message to a file
   
}

private function hasaccess($currentUser)
{
    // Check if the user has access rights based on their role
    return $currentUser->role == '1' || $currentUser->role == '2';
}



  
   



}
