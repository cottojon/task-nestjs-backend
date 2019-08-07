import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status-enum';
@Injectable()
export class TasksService {



    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) { }

    async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {  
        return this.taskRepository.createTask(createTaskDto); // call our createTask method from taskRepo
    }

    async getTaskByID(id: number): Promise<Task> { 
        const found = await this.taskRepository.findOne(id); 
        

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }


        return found; 
    }


    // comment the other methods our for now
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
