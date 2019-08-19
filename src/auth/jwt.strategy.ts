

import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

//pass in the strategy to use inside of passportStrategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){


    // Dependency inject userRepository
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // define how to retreive the jwt token from the request
            secretOrKey: 'topSecret51', // the secret that passport will use to verify the signature
        }); // call the constructor of the base class that we are extending
    }


    // this method must exist for every strategy
    // the payload is already verified by passport at the point in execution
    // what we return from this method will be injected to the request that is guarded with authentication
    async validate(payload: JwtPayload): Promise<User>{
        const {username} = payload;
        // retreive the username based on the payload from the DB using userRepo
        const user = await this.userRepository.findOne({username});

        if(!user){ //user not found
            throw new UnauthorizedException();
        }


        return user; // return the whole user
    }
}