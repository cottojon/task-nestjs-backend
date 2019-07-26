import { Controller, Get } from '@nestjs/common';
//import service
import {TasksService} from './tasks.service';

@Controller('tasks')
export class TasksController {

    //create a private taskService class propety of type class Service
    //TaskService will be instantitated and injected
    constructor(private taskService: TasksService){}

    //our method to get all task from service
    @Get()
    getAllTask(){
        return this.taskService.getAllTask();
    }


}
