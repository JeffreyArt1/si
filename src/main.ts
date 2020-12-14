import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { DatabaseExceptionFilter, HttpExceptionFilter } from '@common/filters';
import { AppModule } from '@core/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new DatabaseExceptionFilter(),
  );
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());

  await app.listen(AppModule.port);
}
bootstrap();
