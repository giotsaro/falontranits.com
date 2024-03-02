<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Maps;
use App\Http\Resources\MapRecource;
use App\Http\Requests\StoreMapsRequest;
use App\Http\Requests\UpdateMapsRequest;
use App\Models\Driver;
use App\Models\ZIPcode;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;


class MapsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $drivers = MapRecource::collection(
        Driver::query()
            ->orderBy("id", "desc")
            ->where('company_id', Auth::user()->company_id)
            ->where('isactive', '=','1')
            ->whereNotNull('LAT')
            ->whereNotNull('LNG')
            ->paginate(1000)
    );

     foreach ($drivers as $driver) {
        // Fetch location information for each driver
        $location = DB::table('usa_zips')
            ->where('zip_code', $driver->zip)
            ->select('LAT', 'LNG','city', 'county', 'state_id')
            ->first(); // Use first() to get a single result

        // Add location information to the driver
        $driver->LAT = $location->LAT ;
        $driver->LNG = $location->LNG ;
        $driver->location = $location
        ? $location->city . ' ' . $location->county . ' ' . $location->state_id
        : 'Location not available';
    }
     
       
        return $drivers;


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
    public function store(StoreMapsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Maps $maps)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Maps $maps)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMapsRequest $request, Maps $maps)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Maps $maps)
    {
        //
    }
}
