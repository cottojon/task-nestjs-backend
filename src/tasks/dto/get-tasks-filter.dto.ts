import { TaskStatus } from '../tasks.model';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';


export class GetTaskFilterDto {
    @IsOptional() // both properties are optional
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE]) //checks if array of values given is in the property
    status: TaskStatus;

    @IsOptional() // both properties are optional
    @IsNotEmpty() // no empty strings
    search: string;
}
