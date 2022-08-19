import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import cookieSession from 'cookie-session'; // not working
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['cookie-secret']
  }));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // ignore unexpected fields
  }))
  await app.listen(4000);
}
bootstrap();
