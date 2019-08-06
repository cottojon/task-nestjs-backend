import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get()// add validationpipe to @Query as a parameter
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {

        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        }

        return this.taskService.getAllTask();
    }

    @Post()
    @UsePipes(ValidationPipe) 
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
    updateTaskStatusByID(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
        return this.taskService.updateTaskStatus(id, status);
    }

}
