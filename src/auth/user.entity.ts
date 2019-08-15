import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import * as brcrypt from 'bcrypt';
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

    // custom method to run business logic for a specific instance of a user
    // return true if password is correct
    async validatePassword(password: string): Promise<boolean>{
        const hash = await brcrypt.hash(password, this.salt);
        // evaulate to true if this is a match and client side password was correct
        return hash  === this.password;
    }
}