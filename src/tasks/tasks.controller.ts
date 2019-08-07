import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
//import task 
import {Task} from './task.entity';


@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get('/:id') 
    getTaskByID(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskByID(id);
    }

    @Post()
    @UsePipes(ValidationPipe) // change return type to promise
    createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {

        return this.taskService.createTask(createTaskDto);
    }



    // comment out the other handlers for now
    /*
    @Get()// add validationpipe to @Query as a parameter
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {

        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        }

        return this.taskService.getAllTask();
    }

   
   

    @Delete('/:id')
    deleteTaskByID(@Param('id') id: string): void {
        this.taskService.deleteTaskByID(id);
    }

    @Patch('/:id/status') 
    updateTaskStatusByID(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
        return this.taskService.updateTaskStatus(id, status);
    }

    */
}
