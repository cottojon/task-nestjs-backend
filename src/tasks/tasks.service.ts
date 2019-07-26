import { Injectable } from '@nestjs/common';

@Injectable() //makes it available for injection in other components
export class TasksService {
    //store task in array for now
    private tasks = []; //make it private so only this class can make changes to the task array directly. we want only the service to do so


    //create a get all task method to return all task to the Contoller
    getAllTask(){
        return this.tasks;
    }

}
