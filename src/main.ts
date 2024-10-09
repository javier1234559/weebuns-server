import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import config from 'src/config';
import { CreateUserDto } from 'src/models/user/dtos/create-user.dto';
import { UpdateUserDto } from 'src/models/user/dtos/update-user.dto';
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import { UpdateSpaceDto } from 'src/models/space/dto/update-space.dto';
import { ReadSpaceDto } from 'src/models/space/dto/read-space.dto';
import { DeleteSpaceDto } from 'src/models/space/dto/delete-space.dto';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Weebuns lms api')
    .setDescription(
      'This docs includes all the endpoints of the weebuns lms api',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: [
      CreateUserDto,
      UpdateUserDto,
      CreateSpaceDto,
      UpdateSpaceDto,
      ReadSpaceDto,
      DeleteSpaceDto],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
}
bootstrap();
