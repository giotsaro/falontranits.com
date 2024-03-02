<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyRecources extends JsonResource
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
            "company"=> $this->company,
            "email"=> $this->email,
            "phone"=> $this->phone,
            "creator"=> $this->creator,
            "credited"=> $this->credited,
            "credited_until"=> $this->credited_until->format("Y-m-d"),//->format("Y-m-d H:i:s")
            "created_at"=>  $this->created_at->format("Y-m-d H:i:s"),//->format("Y-m-d H:i:s"),
            "updated_at"=>  $this->updated_at->format("Y-m-d H:i:s"),//->format("Y-m-d H:i:s"),
        ];
    }
}
