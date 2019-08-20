import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as brcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';
// import bcrypt


@Entity()
@Unique(['username']) // expects an array of column names
export class User extends BaseEntity{
    @PrimaryGeneratedColumn() // p key and auto generated
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;


    @Column()
    salt: string;

    // every user can relate to many task
    // first the decorator need the type
    // second how can we access the user that owns the task
    // third we can provide relationship options
    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[];

    // custom method to run business logic for a specific instance of a user
    // return true if password is correct
    async validatePassword(password: string): Promise<boolean>{
        const hash = await brcrypt.hash(password, this.salt);
        // evaulate to true if this is a match and client side password was correct
        return hash  === this.password;
    }
}