import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status-enum';
import { DeleteResult } from 'typeorm';
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


    async deleteTaskByID(id: number): Promise<void> { // don't return anything
       
        
        //we will use the delete method in Repository class
        const result = await this.taskRepository.delete(id); //returns a DeleteResult
        //if we did not delete anything throw exception
        if(result.affected === 0) { //amount of affected rows
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }

    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        //retrieve task
        const task = await this.getTaskByID(id); //return a Promise<Task>
        task.status = status;
        //save it
        await task.save();
        return task;
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

    


    

 

   

    */

}
