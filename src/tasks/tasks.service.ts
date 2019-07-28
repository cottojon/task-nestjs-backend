import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1'; // import everything as uuid from uuid/v1

@Injectable()
export class TasksService {
    private tasks: Task[] = [];


    getAllTask(): Task[] {
        return this.tasks;
    }


    // need two parameters a title and description
    createTask(title: string, description: string): Task { // return a task using typescript
        // create a object of type task
        // in ES6, we are using a shorthand syntax to define our key and values when they have the same identifier
        const task: Task = {
            id: uuid(), // generate uuid using the uuid()
            title,
            description,
            status: TaskStatus.OPEN,
        }

        // add to our tasks array
        this.tasks.push(task);

        // a good practice to return the newly created resource in a REST api
        // frontend dev will love you for this
        // the reason being after a task has been created
        // the front end does not have to ask for all of the task again to check if a task has actually been created
        return task;
    }

}
