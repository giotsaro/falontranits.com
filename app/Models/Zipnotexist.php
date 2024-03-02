<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zipnotexist extends Model
{
    use HasFactory;
    protected $table = 'zipnotexist';

    protected $fillable = [
        'id',
        'request_by',
        'company_id',
        'zip_code',  
    ];

    protected $casts = [
        
        'created_at' => 'datetime',
        "updated_at"=> 'datetime',
    
    ];



}
