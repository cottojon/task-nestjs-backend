import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.password = password;

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
}