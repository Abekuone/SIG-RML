<?php

namespace App\services;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class CrudService
{
    public function index($model, $criteria = [])
    {
        $query = $model::query();

        foreach ($criteria as $key => $value) {
            $query->orWhere($key, 'like', '%' . $value . '%');
        }

        return $query;
    }



    public function show($model, $id)
    {
        if (!$model::find($id)) {
            return null;
        }

        return $model::find($id);
    }
    public function get($model, $nature)
    {
        return $model::where('nature',$nature)->first();
    }

    public function store($model, array $data)
    {
        if (array_key_exists('password', $data) && $data['password'] !== null) {
            $data['password'] = Hash::make($data['password']);
        }

        return $model::create($data);
    }

    public function update($model, $id, array $data)
    {
        $modelInstance = $model::find($id);

        if (!$modelInstance) {
            return null;
        }

        if (array_key_exists('password', $data) && $data['password'] !== null) {
            $data['password'] = Hash::make($data['password']);
        }

        $modelInstance->update($data);
        return $modelInstance;
    }

    public function destroy($model, $id)
    {
        $modelInstance = $model::find($id);
        if (!$modelInstance) {
            return null;
        }

        $modelInstance->delete();
        return $modelInstance;
    }

}
