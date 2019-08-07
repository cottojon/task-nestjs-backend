//import from typeorm
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from './task-status-enum';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn() // primary key column and should be generated and incremented whenever we create a new task
    id: number;

    @Column() // a column in our table
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;


}

