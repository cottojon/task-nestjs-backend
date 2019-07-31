import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDTO } from './dto/create-task.dto';
//import dto
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get()// gonna retrieve these parameters from the query which will be parsed into an object called filterDto 
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        // if parameters are empty get all task/ if not filter our task
        if(Object.keys(filterDto).length){
            return this.taskService.getTasksWithFilters(filterDto);
        }
        // keep get all task in the service if the query parameters are empty
        return this.taskService.getAllTask();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDTO): Task {

        return this.taskService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskByID(@Param('id') id: string): Task {
        return this.taskService.getTaskByID(id);
    }

    @Delete('/:id')
    deleteTaskByID(@Param('id') id: string): void {
        this.taskService.deleteTaskByID(id);
    }

    @Patch('/:id/status') 
    updateTaskStatusByID(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        return this.taskService.updateTaskStatus(id, status);
    }

}
