<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EditDriverRecource extends JsonResource
{
    
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            "id"=> $this->id,
            "units"=> $this->units,
            "name"=> $this->name,
            "dims"=> $this->dims,
            "payload"=> $this->payload,
            "phone"=> $this->phone,
            "location"=> $this->location,
            "zip"=> $this->zip,
            "date"=>$this->date,
            "comments"=> $this->comments,
            "email"=> $this->email,
            "emergency"=> $this->emergency,
            "reserved"=> $this->reserved,
            "reserved_by"=> $this->reserved_by,
            "distance"=> $this->distance,
            "updated_at"=> $this->updated_at->format("Y-m-d H:i"),
            "created_at"=> $this->created_at->format("Y-m-d H:i"),
        ];
    }
}
