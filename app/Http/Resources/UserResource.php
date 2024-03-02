<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "role"=> $this->role,
            "name"=> $this->name,
            "email"=> $this->email,
            "phone"=> $this->phone,
            "created_at"=> $this->created_at->format("d/m/Y"),
        ];
    }
}
