import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
     {message: 'password too weak'}) // provide a regular expression with a error message because the default one is too long
    password: string;
}