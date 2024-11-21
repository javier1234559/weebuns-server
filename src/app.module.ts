import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

import { CacheKeyInterceptor } from 'src/common/cache/cache-key.interceptor';
import { CommonModule } from 'src/common/common.module';
import { HealthModule } from 'src/common/health/health.module';
import { ActivityInterceptor } from 'src/common/interceptor/activity.interceptor';
import { RemoveFieldInterceptor } from 'src/common/interceptor/remove-field.interceptor';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { AiModule } from 'src/models/ai/ai.module';
import { CorrectionModule } from 'src/models/correction/corrrection.module';
import { CourseModule } from 'src/models/course/course.module';
import { EssayModule } from 'src/models/essay/essay.module';
import { HashTagModule } from 'src/models/hashtag/hashtag.module';
import { NoteModule } from 'src/models/note/note.module';
import { SpaceModule } from 'src/models/space/space.module';
import { StatsModule } from 'src/models/stats/stats.module';
import { UnitContentModule } from 'src/models/unit-content/unit-content.module';
import { UnitModule } from 'src/models/unit/unit.module';
import { UserModule } from 'src/models/user/user.module';
import { VocabularyModule } from 'src/models/vocabulary/vocabulary.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    CorrectionModule,
    VocabularyModule,
    HealthModule,
    HashTagModule,
    StatsModule,
    CourseModule,
    UnitModule,
    UnitContentModule,
    NoteModule,
    AiModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RemoveFieldInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheKeyInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ActivityInterceptor,
    },
  ],
})
export class AppModule {}
