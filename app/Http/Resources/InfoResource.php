<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InfoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "role"=> $this->role,
            "name"=> $this->name,
            "email"=> $this->email,
         
            "company"=> $this->company,
            "created_at"=> $this->created_at->format("d/m/Y"),
        ];
    }
}
