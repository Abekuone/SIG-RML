<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class RolePermission extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'role_permissions';

    protected $fillable = [
        'role_id',
        'permission_id'
    ];
}
