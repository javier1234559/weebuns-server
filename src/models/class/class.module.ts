import { Module } from '@nestjs/common';

import { User } from 'src/models/user/graphql/entities/user.entity';

import { ClassResolver } from './class.resolver';
import { ClassService } from './class.service';

@Module({
  providers: [ClassResolver, ClassService],
})
export class ClassModule {}
