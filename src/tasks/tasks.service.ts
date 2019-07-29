import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1'; 
import { CreateTaskDTO } from './dto/create-task.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];


    getAllTask(): Task[] {
        return this.tasks;
    }


    createTask(createTaskDto: CreateTaskDTO): Task { 
        const {title, description} = createTaskDto;


        const task: Task = {
            id: uuid(), 
            title,
            description,
            status: TaskStatus.OPEN,
        }

       
        this.tasks.push(task);

       
        return task;
    }


    getTaskByID(id: string){
        return this.tasks.find(task => { 
            return task.id === id;
        })

    }


    deleteTaskByID(id: string): void{ 
        this.tasks = this.tasks.filter( task => { 
            return task.id !== id;
        });

    }


    //our new method
    updateTaskStatus(id: string, status: TaskStatus): Task {
        //find task by id
        const task = this.getTaskByID(id);
        task.status = status; //update status
        return task;
    }

}
