import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';

import config from 'src/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  console.log(cookieParser());
  app.use(cookieParser());

  app.setGlobalPrefix('api');

  // app.enableCors({
  //   origin: '*',
  //   credentials: true,
  // });
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Weebuns lms api')
    .setDescription(
      'This docs includes all the endpoints of the weebuns lms api',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    // extraModels: [
    //   CreateUserDto,
    //   UpdateUserDto,
    //   CreateSpaceDto,
    //   UpdateSpaceDto,
    //   UserLoginResponse,
    // ],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
}
bootstrap();
