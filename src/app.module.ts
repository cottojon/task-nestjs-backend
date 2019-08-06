import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

// for root= for our root mofule
// pass in our config

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule], //import module
})
export class AppModule {}
