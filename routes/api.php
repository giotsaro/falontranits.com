<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\InfoController;
use App\Http\Controllers\Api\MapsController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\GetDriverController;
use App\Http\Controllers\Api\Admin\AdminUserController;
use App\Http\Controllers\Api\DeletedDriverController;
use App\Http\Controllers\Api\DeletedUsersController;
use App\Http\Controllers\Api\SA\ZIPcodeController;
use App\Http\Controllers\Api\EditDriverController;
use App\Http\Controllers\Api\GetDriver;
use App\Http\Controllers\Api\Reservation;
use App\Http\Controllers\Api\UpdateDriver;

use App\Http\Controllers\Api\SA\SAController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware(['auth:sanctum','token'])->group(function () {

   Route::post('/logout', [AuthController::class, 'logout']);
   Route::apiResource('/info', InfoController::class );

   Route::middleware(['Credit'])->group(function () {
   Route::post('/getdrivers', GetDriverController::class);
   Route::apiResource('/editdrivers', EditDriverController::class)->only(['show', 'update']);
   Route::apiResource('/map', MapsController::class);
   Route::post('/reservation', Reservation::class);
   //Route::post('/reservation', Reservation::class)->only(['update']);
   
  
  Route::middleware(['Admin'])->group(function () {
    Route::apiResource('/users', AdminUserController::class);
    Route::apiResource('/drivers', DriverController::class);
    Route::apiResource('/removeddrivers', DeletedDriverController::class);
    Route::apiResource('/removedusers', DeletedUsersController::class);
    Route::apiResource('/company', CompanyController::class);
   
  }); 
});
Route::middleware(['sa'])->group(function () {
 
    Route::apiResource('/zips', ZIPcodeController::class);
    Route::apiResource('/companies', SAController::class);

});




});





Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);