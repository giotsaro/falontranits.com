<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;

class CreditMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get the company ID from the authenticated user
        $companyId = Auth::user()->company_id;

        // Retrieve the company record
        $company = Company::find($companyId);

        // Check if the company is credited
        if ($company && $company->credited) {    
            return $next($request);
        } else {
            // Return a response indicating that the company is not credited
            return response("Company is not credited", 403);
        }
    }
}
