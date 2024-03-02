<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ZipDoesNotExist extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "request_by" => $this->request_by,
            "company_id" => $this->company_id,
            "zip_code" => $this->zip_code,
            "created_at" => $this->created_at->format('Y-m-d H:i:s'), // Assuming you want to format created_at as datetime
            "updated_at" => $this->updated_at->format('Y-m-d H:i:s'), // Assuming you want to format updated_at as datetime
        ];
        
    }
}
