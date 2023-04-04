<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules = collect([
            'name' => 'required',
            'email' => ['required', Rule::unique('users')->ignore($this->id)],
            'roles' => 'required',
            'roles.*' => 'required|exists:roles,name',
            'image' => 'nullable',
            'new_image' => 'nullable',
            'email_verified_at' => 'nullable',
            'password' => 'nullable',
        ]);
        return $rules->toArray();
    }
}
