import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
   
   
 
    /*
    getAllTask(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {

        const { status, search } = filterDto;
        let tasks = this.getAllTask();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }

    createTask(createTaskDto: CreateTaskDTO): Task {  
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }


    getTaskByID(id: string) {
        const found = this.tasks.find(task => {
            return task.id === id;
        });

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found.`); 
        }


        return found;
    }

    deleteTaskByID(id: string): void {
        //get task by id
        const found = this.getTaskByID(id); // if the task has not been found, an excpetion would have been thrown

        this.tasks = this.tasks.filter(task => {
            return task.id !== found.id; // change the comparision to found.id rather than just id
        });

    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskByID(id);
        task.status = status;
        return task;
    }

    */

}
