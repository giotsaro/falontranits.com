<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    protected $table = 'companies';
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'company' => 'required',
            'email'=> 'required|email|unique:companies,email|unique:users,email',
            'phone' => 'required',
            'credit_until' => 'datetime',
            'password' => [
                'required',
                Password::min(8)->letters()],

        ];
    }
}
