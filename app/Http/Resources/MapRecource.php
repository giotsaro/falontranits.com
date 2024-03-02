<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MapRecource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        "name"=> $this->name,
        "phone"=> $this->phone,
        "dims"=> $this->dims,
        "reserved"=> $this->reserved,
        "date"=> $this->date,
        "payload"=> $this->payload,
        "zip"=> $this->zip,
        'location'=> $this->location,
        "LAT"=> $this->LAT,
        "LNG"=> $this->LNG,
        ];



    }
}
