<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class AutoCompleteController extends Controller
{
    public function autocomplete(Request $request, $type)
    {
        switch ($type) {
            case 'user_roles':
                return response()->json(Role::select('name', 'id')->pluck('name'));
            default:
                return response()->json();
        }
    }
}
