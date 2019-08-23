import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';



// we can also apply guarding at the controller level here 
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    
    @Post('/signup') // validation pipe added for authCredentialsDto
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }


    //sign in handler
    @Post('/signin') //
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        return this.authService.signIn(authCredentialsDto);
    }



}
