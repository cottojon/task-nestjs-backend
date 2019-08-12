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


    async deleteTaskByID(id: number): Promise<void> { 
       
        
        const result = await this.taskRepository.delete(id); 
        if(result.affected === 0) { 
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }

    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskByID(id); 
        task.status = status;
    
        await task.save();
        return task;
    }

    async getTask(filterDto: GetTaskFilterDto): Promise<Task[]>{ //return task array
        return await this.taskRepository.getTask(filterDto); //call our getTAsk method
    }

}
