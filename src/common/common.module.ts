import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { ValidationModule } from 'src/common/decorators/validation.module';
// import { ValidationModule } from 'src/common/decorators/validation.module';
import { LoggerMiddleware } from 'src/common/logger/logger.middleware';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import config, { MAX_AGE } from 'src/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: MAX_AGE },
    }),
    ValidationModule,
  ],
  exports: [ConfigModule, ValidationModule],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
