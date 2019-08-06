import { IsNotEmpty } from 'class-validator';


export class CreateTaskDTO {
    @IsNotEmpty() // apply decorator to our class properties
    title: string;

    @IsNotEmpty()
    description: string;
}