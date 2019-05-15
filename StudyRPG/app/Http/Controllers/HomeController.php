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
        DB::table("tasks")->where("id", $task_id)->update(["done" => 1, "finished" => now()]);
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
                    ->where('start', '<=', now())
                    //->where('end', '>=', now())
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
            ['name' => $subject_name, 'created_at' => now(), 'updated_at' => now()]
        );
        
        return $this->get_subjects(); 
    }
    
    /*
     *  Inserts a new Task and returns an updated dataset of table
     */
    public function save_task($subject_id, $task_name, $task_description, $start, $end){
        DB::table('tasks')->insert(
            ['subject_id' => $subject_id, 'name' => $task_name, 'description' => $task_description, 'start' => $start, 'end' => $end, 'done' => 0, 'updated_at' => now(), 'created_at' => now() ]
        );
        
        return $this->get_subjects_tasks($subject_id);
    }
    
    /*
     * Returns finsihed tasks grouped by month and year
     */
    public function get_process(){
        /*
        seLECT CONCAT(MONTH(finished), CONCAT( ".", YEAR(finished))), count(tasks.id) FROM tasks 
WHERE done = 1
GROUP BY MONTH(finished), YEAR(finished)
ORDER BY YEAR(finished), MONTH(finished)
        */
        
        $result = DB::table('tasks')
            ->select(DB::raw("MONTH(finished) as month, YEAR(finished) as year, count(tasks.id) as c"))
            ->where("done", 1)
            //->whereBetween("")
            ->groupBy("month", "year")
            ->orderBy("year")
            ->orderby("month")
            ->get();
        
        $json_array = json_decode(json_encode($result), true);
        
        // Divide and conquer
        //echo "Splitted\n";
        $act_month = $json_array[0]["month"];
        $act_year = $json_array[0]["year"];
        
        $begin = 0;
        $position = 0;
        
        $year_arrays = [];
        
        foreach($json_array as $row){
            if($row["year"] != $act_year){
                $year_arrays[] = array_slice($json_array, $begin, $position);
                $begin = $position;
                $act_year = $row["year"];
            }
                
            $position++;
        }
        $year_arrays[] = array_slice($json_array, $begin);
        
        $result_array = [];
        $next_year = false;
        foreach($year_arrays as $year){
            $start_month = $year[0]["month"];
            
            if($next_year){
                $start_month = 1;
            }
            $end_month = $year[count($year)-1]["month"];
            if($end_month == 11){
                $end_month = 12;
            }
            $start_year = $year[0]["year"];
            
            $key_array = [];
            foreach($year as $row){
                $m = $row["month"];
                if($m < 10){
                    $m = "0".$m;
                }
                $key_array[$m.".".$start_year] = $row["c"];
            }
            
            //print_r($key_array);
            
            for($y = $start_month; $y <= $end_month; $y++){
                $m = $y;
                if($m < 10 ){
                    $m = "0".$m;
                }
                if(isset($key_array[$m.".".$start_year])){
                    //echo "exist ".$y."-".$start_year."\<br>";
                }else{
                    //echo "import ".$y."-".$start_year."\<br>";
                    $m = $y;
                    if($m < 10){
                        $m = "0".$m;
                    }
                    $key_array[$m.".".$start_year] = 0;
                }
            }
            
            ksort($key_array);
            
            $keys = array_keys($key_array);
            foreach($keys as $k){
                $v = $key_array[$k];
                $result_array[] = array("date" => $k, "value" => $v);
            }
            
            $next_year = true;
            
        }
        
        return $result_array;
    }
}
