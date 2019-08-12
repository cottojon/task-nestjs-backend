import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
//import task 
import {Task} from './task.entity';
import { TaskStatus } from './task-status-enum';


@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get('/:id') 
    getTaskByID(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskByID(id);
    }

    @Post()
    @UsePipes(ValidationPipe) 
    createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {

        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')// parse the id to int 
    deleteTaskByID(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.deleteTaskByID(id); //return a promise or we will have an uncatched promise error when err handling
    }



    @Patch('/:id/status') 
    updateTaskStatusByID(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return this.taskService.updateTaskStatus(id, status);
    }


   
    @Get()// add validationpipe to @Query as a parameter
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]> { //return task array

        return this.taskService.getTask(filterDto);
    }

}
