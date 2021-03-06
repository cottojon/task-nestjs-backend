import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';

@Module({ // our app.module already has typeform.forRoot
          // instead we use forFeature and provide all our entities and repos 
          // that we want to have dependency injected throught our task module
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule], // import authmodule for our strategy ad passport
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
