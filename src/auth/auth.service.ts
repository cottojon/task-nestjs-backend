import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    //depenency inject srvices
    constructor( @InjectRepository(UserRepository) private userRepository: UserRepository,
                private jwtService: JwtService){}

    // our sign up method
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
       return await this.userRepository.signUp(authCredentialsDto);
    }

    //our sign in method
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{ //return an object with accessToken inside
        // if username exist and password is valid we will get back the username else we get back null
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);

        // throw an exception if credentials are invalid
        if(!username){
            throw new UnauthorizedException('Invalid Credentials'); //status code 401
        }

        // create the payload for our jwt token
        const payload: JwtPayload = { username};
        //generate token
        const accessToken = await this.jwtService.sign(payload);

        //return an object containing the accessToken
        return { accessToken };

    }
}
