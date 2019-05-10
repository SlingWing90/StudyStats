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
    
    public function set_task_done($task_id){
        DB::table("tasks")->where("id", $task_id)->update(["done" => 1]);
    }
    
    public function get_subjects_tasks_done(){
        // 100 / all * sum(done)
        return DB::table("subjects")
                    ->select("subjects.name", DB::raw("(100 / if(count(tasks.id) = 0, 1, count(tasks.id)) * sum(if(tasks.done = 1, 1, 0))) as c"))
                    ->leftJoin('tasks', 'subjects.id', '=', 'tasks.subject_id')
                    //->where("tasks.done", 1)
                    ->groupBy("subjects.name")
                    ->get();
    }
    
    public function get_subjects_tasks(){
        return DB::table("subjects")
                    ->join('tasks', 'subjects.id', '=', 'tasks.subject_id')
                    ->get(["subjects.name", "count(tasks.done)"]);
    }
    
    public function get_tasks($done){
        
        return DB::table('tasks')
                    ->where('done', $done)
                    ->orderBy("end")
                    ->get();
        
        echo $done;
    }
}
