<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ZipCodeRecource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       // return parent::toArray($request);

        return [
            "id"=> $this->id,
            "city"=> $this->city,
            "county"=> $this->county,
            "state_name"=> $this->state_name,
            "state_id"=> $this->state_id,
            "zip_code"=> $this->zip_code,
            "LAT"=> $this->LAT,
            "LNG"=> $this->LNG,
            "created_at"=>  $this->created_at->format("Y-m-d H:i:s"),
            "updated_at"=>  $this->updated_at->format("Y-m-d H:i:s"),
        ];


    }
}
