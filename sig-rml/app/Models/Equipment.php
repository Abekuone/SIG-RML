<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Equipment extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    protected $fillable = [
        'name',
        'description',
        'type',
        'quantity',
        'status',
        'laboratory_id',
        'is_shared',
    ];

    public function laboratory()
    {
        return $this->belongsTo(Laboratory::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}


