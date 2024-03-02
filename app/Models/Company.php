<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;


    protected $table = 'companies';

    protected $fillable = [
        'id',
        'company',
        'email',
        'phone',
        'creator', 
        'credited', 
        'credited_until', 
       
    ];

     /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'credited_until'=> 'datetime', 
        'created_at' => 'datetime',
        "updated_at"=> 'datetime',
        
    
    ];
    public static $rules = [
        'email' => 'unique:companies,email'
    ];

}
