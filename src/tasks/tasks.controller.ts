import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model'; 
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get()
    getAllTask(): Task[] {
        return this.taskService.getAllTask();
    }

   
    @Post() 
    createTask(@Body() createTaskDto: CreateTaskDTO): Task { 
        
        return this.taskService.createTask(createTaskDto); 
    }


 
    @Get('/:id') 
    getTaskByID(@Param('id') id: string): Task{ 
        return this.taskService.getTaskByID(id);
    }


    @Delete('/:id')
    deleteTaskByID(@Param('id') id: string): void{
        this.taskService.deleteTaskByID(id);
    }

    //our patch handler
    @Patch('/:id/status') //our url with a id passed in 
    updateTaskStatusByID(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        return this.taskService.updateTaskStatus(id, status); //update task
    }


}
