import { Module } from '@nestjs/common';

import { ClassMemberResolver } from './class-member.resolver';
import { ClassMemberService } from './class-member.service';

@Module({
  providers: [ClassMemberResolver, ClassMemberService],
})
export class ClassMemberModule {}
