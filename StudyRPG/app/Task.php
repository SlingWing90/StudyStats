<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //
    
    protected $table = "tasks";
    
    protected $fillable = [
        'name', 'subject_id', 'description', 'end'
    ];
    
    public function subject()
    {
        return $this->belongsTo('App\Subject');
    }
}
