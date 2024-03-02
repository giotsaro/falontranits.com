<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZIPcode extends Model
{
    use HasFactory;

    protected $table = 'usa_zips';

    protected $fillable = [
        'city',
        'county',
        'state_name',
        'state_id',
        'zip_code',
        'LAT',
        'LNG',
    ];

     /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        
        'created_at' => 'datetime',
        "updated_at"=> 'datetime',
    
    ];





}
