import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './task-status-enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';



@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTask(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto; //destruct our filterDto
        // we have many ways to achieve this business logic
        // The simplest and cleanest way is to use the query builder
        // create query builder with a keyword 'task', this keyword will be used within our query to refer to our task entity
        const query = this.createQueryBuilder('task'); // method comes from Repo class

        //add the user id to using a where clause
        query.andWhere('task.userId = :userId', {userId: user.id});

        // if the user has provided us a status this variable will be defined
        if (status) {
            query.andWhere('task.status = :status', { status }); // write a where clause, task comes from our keyword
            // provide and object for the second parameter that represents our variable in the where clause string
            // we are using shorthand ntation for our 2nd param object {status: status}
        }

        // if the user provides a search term
        if (search) {
            // sql like allows for partial matches
            // search in the title and the description
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` }); // to use partial matching we have to wrap our search term
        }

        const tasks = query.getMany(); // execute the query and expect many result

        return tasks;
    }

    //pass user in
    async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user; // assign task to user
        await task.save();

        // delete the user property that we are returning back because we don't want to return that to the frontend
        delete task.user;

        return task;
    }

}