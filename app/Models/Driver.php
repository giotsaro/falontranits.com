<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Driver extends Model
{
    use HasFactory ,HasApiTokens;



    protected $fillable = [
        'id',
        'unit',
        'name',
        'dimensions',
        'payload',
        'phone',
        'location',
        'zip',
        'LAT',
        'LNG',
        'date',
        'Comments',
        'email',
        'emergency',
        'reserved',
        'reservedid',
        'reserved_by',
        'company_id',
        'insurensexp',
        'creator',
        'isactive', 
    ];
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'updated_date',
        'created_at'=> 'datetime',
    
    ];
}
