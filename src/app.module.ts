import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

import { CommonModule } from 'src/common/common.module';
import { HealthModule } from 'src/common/health/health.module';
import { UserModule } from 'src/models/user/user.module';

import { ClassMemberModule } from './models/class-member/class-member.module';
import { ClassModule } from './models/class/class.module';

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
    HealthModule,
    ClassModule,
    ClassMemberModule,
  ],
})
export class AppModule {}
