<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     *
     */
    public function handle(Request $request, Closure $next): Response
    {    
       if (Auth()->check()) {
            $user= Auth::user();
         if ($user->role==1||$user->role==2){    
            return $next($request);
        }else {
          return response("access denied" ,403);
        }
    } 
    else{
      return response("იდინახუი");
    }
   
}
}
