<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class CategoryEquipment extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'category_equipments';

    protected $fillable = [
        'name',
        'description'
    ];

    public function equipements(): HasMany
    {
        return $this->hasMany(Equipement::class);
    }
}
