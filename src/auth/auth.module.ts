import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), //provide it with the default stretegy
    JwtModule.register({
      secret: 'topSecret51', //the secret to be used, don't use somethign so easy in production
      signOptions: {
        expiresIn: 3600, //token will only live for 3600 seconds = 60 minutes
      }
    }),
    TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
