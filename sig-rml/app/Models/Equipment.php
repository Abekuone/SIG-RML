<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Equipment extends Model
{

    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'description',
        'type',
        'status',
        'laboratory_id',
        'qunaity',
        'image',
        'is_shared',
        'responsable_id'
    ];

    public function laboratory()
    {
        return $this->belongsTo(Laboratory::class, 'laboratory_id');
    }

    public function responsableEquipement()
    {
        return $this->belongsTo(User::class, 'responsable_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}


