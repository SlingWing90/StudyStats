<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use App\Subject;
use App\Task;

class HomeController extends Controller
{
    /*
     *  Returns all Subjects from table
     */
    public function get_subjects(){
        return Subject::all();
    }
    
    /*
     *  Updates a task to show its done
     */
    public function set_task_done($task_id){
        DB::table("tasks")->where("id", $task_id)->update(["done" => 1]);
    }
    
    /*
     * Returns all Subjects with a counting of done tasks
     */
    public function get_subjects_tasks_done(){
        // 100 / all * sum(done)
        return DB::table("subjects")
                    ->select("subjects.name", DB::raw("(100 / if(count(tasks.id) = 0, 1, count(tasks.id)) * sum(if(tasks.done = 1, 1, 0))) as c"))
                    ->leftJoin('tasks', 'subjects.id', '=', 'tasks.subject_id')
                    //->where("tasks.done", 1)
                    ->groupBy("subjects.name")
                    ->get();
    }
    
    /*
     * Returns tasks from a given subject_id
     */
    public function get_subjects_tasks($subject_id){
        return DB::table("tasks")
                    ->join('subjects', 'subjects.id', '=', 'tasks.subject_id')
                    ->where("subjects.id", $subject_id)
                    ->get(["tasks.*"]);
    }
    
    /*
     * Returns Tasks depending on $done if task is done or not
     */
    public function get_tasks($done){
        
        return DB::table('tasks')
                    ->where('done', $done)
                    ->orderBy("end")
                    ->get();
        
        echo $done;
    }
    
    /*
     * Inserts a new Subject and returns an updated dataset of table
    */
    public function save_subject($subject_name){
        //DB::table("tasks")->where("id", $task_id)->update(["done" => 1]);
        
        DB::table('subjects')->insert(
            ['name' => $subject_name]
        );
        
        return $this->get_subjects(); 
    }
    
    /*
     *  Inserts a new Task and returns an updated dataset of table
     */
    public function save_task($subject_id, $task_name, $task_description, $start, $end){
        DB::table('tasks')->insert(
            ['subject_id' => $subject_id, 'name' => $task_name, 'description' => $task_description, 'end' => $end, 'done' => 0, 'updated_at' => now(), 'created_at' => now() ]
        );
        
        return $this->get_subjects_tasks($subject_id);
    }
}
