import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {

    // inject taskRepo and decorate with proper decorator and provide it the repo we want to inject
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) { }

    // this is a async method: it has one or more async operation in it, always return a Promise<>
    async getTaskByID(id: number): Promise<Task> { // id is no longer a string but a number
        // retrieve the task
        const found = await this.taskRepository.findOne(id); // findOne can handle more parameters
        // every operation with the database is async
        // thus, we do not know when it will end
        // so we use await: this will stop execution and await for our async operation to finish
        // making it a 'synchronous' operation

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }


        return found; // findOne returns a Promise<Task>
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
