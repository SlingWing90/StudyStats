<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('subjects', 'HomeController@get_subjects');
Route::get('subject_tasks/{subject_id}', 'HomeController@get_subjects_tasks');
Route::get('tasks/{done}', 'HomeController@get_tasks');
Route::get('subjects_tasks_done', 'HomeController@get_subjects_tasks_done');

Route::get('done/{task_id}', 'HomeController@set_task_done');

Route::get('new_subject/{subject_name}', 'HomeController@save_subject');
Route::get('new_task/{subject_id}/{task_name}/{task_description}/{start}/{end}', 'HomeController@save_task');

Route::get('process', 'HomeController@get_process');