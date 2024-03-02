<?php

namespace App\Http\Middleware;


use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
        


class tokenmiddl
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user= Auth::user();
       
        /** @var \App\Models\User $user */
          
             if( $user->remember_token !== $request->bearerToken()){

                            

              return response("session expired" ,440);
             }
        

        return $next($request);
    }
}
