import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as brcrypt from 'bcrypt'; // import bcrypt

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        //generate salt
        // these are async operations and take some time to compute, 
        // bcrypt however does provide us with sync methods aswell
        // the salt will always generate a unique salt for us
        const salt = await brcrypt.genSalt();

        //create user
        const user = new User();
        user.username = username;
        user.salt = salt;
        // hash the password and salt 
        user.password = await this.hashPassword(password, salt);


        //try the save query
        try {
             await user.save();

        } catch (error) {
            // catch our duplicate username typeorm error code 23505 = duplicate values
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            }else{
                throw new InternalServerErrorException();
            }
        }
    }

    // if the password is valid return username for now
    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>{
        const {username, password} = authCredentialsDto;

        // check database for the unique username existence
        const user = await this.findOne({username});

        // check for user existence then call validatePassword to check is password is correct
        if(user && await user.validatePassword(password)){
            return user.username; // return username
        }else{
            return null;
        }

    }


    // hashing password and salt using bcrypt 
    // even though our password can be the same since our salts are unique our hashes are always different ;)
    private async hashPassword(password: string, salt: string): Promise<string>{
        return brcrypt.hash(password, salt);
    }
}