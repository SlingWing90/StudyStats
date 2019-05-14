<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger("subject_id");
            $table->string("name");
            $table->string("description");
            $table->dateTime("start");
            $table->dateTime("end");
            $table->dateTime("finished")->nullable();
            $table->unsignedSmallInteger("done");
            
            $table->foreign('subject_id')
                  ->references('id')
                  ->on('subjects')
                  ->onDelete("cascade");
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
