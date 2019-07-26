import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //set Appmpoule as root module
  await app.listen(3000); //listen in port 300
}
bootstrap(); //bootstrap application
