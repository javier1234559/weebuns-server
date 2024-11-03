import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';

import config from 'src/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('api');

  // app.enableCors({
  //   origin: '*',
  //   credentials: true,
  // });

  // if (process.env.NODE_ENV !== 'production') {
  //   setInterval(() => {
  //     const memoryData = process.memoryUsage();

  //     console.log('Application Memory Usage:');
  //     console.log('------------------------');
  //     console.log(
  //       `Total App Memory (RSS): ${(memoryData.rss / 1024 / 1024).toFixed(2)} MB`,
  //     );
  //     console.log(
  //       `Heap Used: ${(memoryData.heapUsed / 1024 / 1024).toFixed(2)} MB`,
  //     );
  //     console.log(
  //       `Heap Total: ${(memoryData.heapTotal / 1024 / 1024).toFixed(2)} MB`,
  //     );
  //     console.log(
  //       `External: ${(memoryData.external / 1024 / 1024).toFixed(2)} MB`,
  //     );
  //     console.log('------------------------');
  //   }, 10000);
  // }

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

  // Enabling service container for custom validator constraint classes (class-validator)
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      // Enable transformation of incoming data to DTO instance
      // This allows default values in DTOs to be applied
      // Example: class UserDto { @IsOptional() age: number = 0; }
      // Request without age will have age set to 0
      transform: true,
      transformOptions: {
        // Automatically convert primitive types
        // Example: "1" (string) becomes 1 (number) if the DTO property is number
        // Works with: numbers, booleans, and simple arrays
        // Query: ?age=25 (string) -> { age: 25 } (number)
        enableImplicitConversion: true,
      },
    }),
  );

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
