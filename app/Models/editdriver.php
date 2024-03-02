<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class editdriver extends Model
{
    protected $table = 'drivers';
    use HasFactory;
    protected $fillable = [

        
        'name',
        'location',
        'zip',
        'date',
        'Comments',
        'reserved',
        'reservedid',
        
        'reserved_by',
      
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
