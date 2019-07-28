//import body decorator
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get()
    getAllTask(): Task[] {
        return this.taskService.getAllTask();
    }

    // use  @post decorator
    @Post() // decorate our body with the body decorator, specify the key in the request body inside our decorator
    createTask(@Body('title') title: string, @Body('description') description: string): Task { //using typescript return a Task
        // call our createTask() from our taskService
        return this.taskService.createTask(title, description);
    }

}
