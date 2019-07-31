import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTask(): Task[] {
        return this.tasks;
    }

    // our filter method
    getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {

        // destruct object
        const { status, search } = filterDto;
        // get all task
        let tasks = this.getAllTask();

        if (status) {
            tasks = tasks.filter(task => task.status === status); // The filter() method creates a new array with all elements that pass the test implemented by the provided function.
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
        return this.tasks.find(task => {
            return task.id === id;
        });

    }

    deleteTaskByID(id: string): void {
        this.tasks = this.tasks.filter(task => {
            return task.id !== id;
        });

    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskByID(id);
        task.status = status;
        return task;
    }

}
