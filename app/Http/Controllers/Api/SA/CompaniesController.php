<?php

namespace App\Http\Controllers\Api\SA;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;

class CompaniesController extends Controller
{

    public function index()
    {
    $companies = Company::collection()->orderBy('id', 'asc')->paginate(1000);
    return response()->json(compact('companies'));

    }
}
