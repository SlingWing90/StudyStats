<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Task;
use Faker\Generator as Faker;

$factory->define(Task::class, function (Faker $faker) {
    
    $date = Carbon\Carbon::create(2019, 5, 28, 0, 0, 0);
    
    return [
        "subject_id" => rand(1,3),
        'name' => substr($faker->sentence(2), 0, -1),
        'description' => substr($faker->sentence(2), 0, -1),
        'end' => $date->addWeeks(rand(1, 52))->format('Y-m-d H:i:s'),
        'done' => rand(0, 1)
        
    ];
});
