<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Document extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'documentable_id',
        'documentable_type',
        'uploaded_by',
    ];

    public function documentable()
    {
        return $this->morphTo();
    }

    public function updateDocument($newFilePath, $newFileName)
    {
        $this->update([
            'file_path' => $newFilePath,
            'file_name' => $newFileName,
            'last_updated_at' => now()
        ]);
    }
}
