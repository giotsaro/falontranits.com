<?php

namespace App\Models\ADMIN;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AUser extends Model
{
    use HasFactory;

    protected $table = 'users';

       /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'role',
        'email',
        'password',
        'company_id',
        'remember_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
       
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        
        //'email_verified_at' => 'datetime',
        'password' => 'hashed',
        
    ];


    public function company()
    {
        return $this->belongsTo('App\Models\Company');
    }
}
