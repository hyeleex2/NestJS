import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

// nest.js의 시작점
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port = serverConfig.port;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}

bootstrap();
