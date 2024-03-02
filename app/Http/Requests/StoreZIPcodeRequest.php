<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreZIPcodeRequest extends FormRequest
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
            'city'=>'required|string,max:55',
            'county'=>'required|string,max:55',
            'state_name'=>'required|string,max:55',
            'state_id'=>'required|string,max:10',
            'zip_code'=>'required|string|unique:usa_zips,zip_code,'.$this->id,
            'LAT'=>'required',
            'LNG'=>'required',
    
        ];
    }
}
