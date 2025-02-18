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
        'libelle',
        'proprietaire_id',
        'category_equipement_id',
        'laboratory_id',
        'description',
        'type',
        'status',
        'availability',
        'quantity',
        'quality',
        'image',
        'is_shared'
    ];

    public function proprietaire(): BelongsTo
    {
        return $this->belongsTo(User::class, 'proprietaire_id');
    }

    public function categoryEquipement(): BelongsTo
    {
        return $this->belongsTo(CategoryEquipement::class);
    }

    public function laboratoire(): BelongsTo
    {
        return $this->belongsTo(Laboratoire::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function documents(): MorphMany
    {
        return $this->morphMany(Document::class, 'documentable');
    }

    public function updateEquipmentQuantity($quantity)
    {
        $this->quantity = $quantity;
        $this->save();
    }
}


