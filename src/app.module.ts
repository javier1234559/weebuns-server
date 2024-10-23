import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

import { CommonModule } from 'src/common/common.module';
import { HealthModule } from 'src/common/health/health.module';
import { RemoveFieldInterceptor } from 'src/common/interceptors/remove-field';
import { EssayModule } from 'src/models/essay/essay.module';
import { SpaceModule } from 'src/models/space/space.module';
import { UserModule } from 'src/models/user/user.module';
import { VocabularyModule } from 'src/models/vocabulary/vocabulary.module';

@Module({
  imports: [
    CommonModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
    SpaceModule,
    EssayModule,
    VocabularyModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RemoveFieldInterceptor,
    },
    // các provider toàn cục khác...
  ],
})
export class AppModule {}
