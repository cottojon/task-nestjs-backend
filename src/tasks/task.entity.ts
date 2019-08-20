//import from typeorm
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TaskStatus } from './task-status-enum';
import { User } from '../auth/user.entity';

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

    //First the type of entity we are having this relationship with
    // second the columns that will be related
    // Third, relation options
    @ManyToOne(type => User, user => user.tasks, {eager: false})
    user: User;


    @Column() //this is the column where we store our relationship ids
    userId: number;


}

