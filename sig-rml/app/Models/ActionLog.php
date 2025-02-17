<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActionLog extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'action',
        'documentable_id',
        'documentable_type',
    ];

    public function documentable()
    {
        return $this->morphTo();
    }
}
