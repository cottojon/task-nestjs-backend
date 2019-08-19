import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import {Task} from './task.entity';
import { TaskStatus } from './task-status-enum';
//import authguard from passport
import { AuthGuard } from '@nestjs/passport';


@Controller('tasks')
@UseGuards(AuthGuard()) // apply guard to how controller/ all the routes
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

    @Delete('/:id')
    deleteTaskByID(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.deleteTaskByID(id); 
    }



    @Patch('/:id/status') 
    updateTaskStatusByID(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return this.taskService.updateTaskStatus(id, status);
    }


   
    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]> { //return task array

        return this.taskService.getTask(filterDto);
    }

}
