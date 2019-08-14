import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['username']) // expects an array of column names
export class User extends BaseEntity{
    @PrimaryGeneratedColumn() // p key and auto generated
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}