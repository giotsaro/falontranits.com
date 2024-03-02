<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZIPcodeDont extends Model
{
    use HasFactory;

    protected $table = 'zipnotexist';

    protected $fillable = [
        'request_by',
        'company_id',
        'zip_code',  
    ];

    protected $casts = [
        
        'created_at' => 'datetime',
        "updated_at"=> 'datetime',
    
    ];
}
