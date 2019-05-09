<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use App\Subject;
use App\Task;

class HomeController extends Controller
{
    public function get_subjects(){
        return Subject::all();
    }
    
    public function get_subjects_tasks_done(){
        //
        return DB::table("subjects")
                    ->select("subjects.name", DB::raw("count(tasks.id) as c"))
                    ->join('tasks', 'subjects.id', '=', 'tasks.subject_id')
                    ->where("tasks.done", 1)
                    ->groupBy("subjects.name")
                    ->get();
    }
    
    public function get_subjects_tasks(){
      
        
        return DB::table("subjects")
                    ->join('tasks', 'subjects.id', '=', 'tasks.subject_id')
                    ->get(["subjects.name", "count(tasks.done)"]);
        
        
     
        
        /*
        SELECT subjects.name, count(tasks.id) 
FROM `subjects`
JOIN tasks
ON tasks.subject_id = subjects.id
GROUP BY subjects.name
        */
    }
    
    public function get_tasks($done){
        
        return DB::table('tasks')
                    ->where('done', $done)
                    ->get();
        
        echo $done;
    }
}
