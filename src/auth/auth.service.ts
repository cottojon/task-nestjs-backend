import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {

    constructor( @InjectRepository(UserRepository) private userRepository: UserRepository){}

    // our sign up method
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
       return await this.userRepository.signUp(authCredentialsDto);
    }

    //our sign in method
    async signIn(authCredentialsDto: AuthCredentialsDto){
        // if username exist and password is valid we will get back the username else we get back null
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);

        // throw an exception if credentials are invalid
        if(!username){
            throw new UnauthorizedException('Invalid Credentials'); //status code 401
        }

        // we will use JWT token later to authenticate the user

    }
}
