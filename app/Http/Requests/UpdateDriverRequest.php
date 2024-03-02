<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use SebastianBergmann\CodeCoverage\Report\Xml\Unit;

class UpdateDriverRequest extends FormRequest
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
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'unit' => 'string',
            'dimensions'=>'string',
            'payload' => 'string',
            'insurensexp' => 'date',
            'emergency' => 'sometimes',
            'zip' => 'min:5|max:5|exists:usa_zips,zip_code',
            'date' => 'date', 
            'comments' => 'sometimes',
         
      
        ];


    }

    public function messages()
    {
        return [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name field must be a string.', 
             'zip.max' => 'incorect zip code',
             'zip.min' => 'incorect zip code', 
            'email.required' => 'The email field is required.',
            'email.email' => 'Please enter a valid email address.',
           
           
        ];
    }
}
