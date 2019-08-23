import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status-enum';
import { DeleteResult } from 'typeorm';
import { User } from '../auth/user.entity';
@Injectable()
export class TasksService {



    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) { }

    async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {  
        return this.taskRepository.createTask(createTaskDto, user); // call our createTask method from taskRepo
    }

    //add user parameter
    async getTaskByID(id: number, user: User): Promise<Task> { 
        // now we need to use a where clause because we want to find a task by two query criteria
        const found = await this.taskRepository.findOne({where: {id, //the taskId
                                                                userId: user.id} //the userId
                                                            }); 
        

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }


        return found; 
    }


    async deleteTaskByID(id: number, user: User): Promise<void> { 
       
        // the delte method accepts a object that translates into where clauses
        // notice unlinke findOne we do not need to specifc 'where'
        const result = await this.taskRepository.delete({ id, userId: user.id}); 
        if(result.affected === 0) { 
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }

    }

  
    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskByID(id, user); 
        task.status = status;
    
        await task.save();
        return task;
    }

    // add parameter
    async getTask(filterDto: GetTaskFilterDto, user: User): Promise<Task[]>{ //return task array
        return await this.taskRepository.getTask(filterDto, user); //call our getTAsk method
    }

}
