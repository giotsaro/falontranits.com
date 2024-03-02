<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDriverRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'unit'=>'required|string',
            'name' => 'required|string',
            'dimensions' => 'required|string',
            'payload'=>'required|string',
            'phone' => 'required|string',
            'location' => 'string',
            'zip'=>'sometimes',
            'date' =>'datetime',
            'comments' => 'string',
            'email' => 'email',
            'emergency'=>'sometimes',
            'reserved' => 'boolean',
            'reserved_by' => 'sometimes|string',
            'insurensexp' =>'sometimes',//|date_format:"Y.m.d"',
            'creator' =>'number',
          
        ];
    }
}