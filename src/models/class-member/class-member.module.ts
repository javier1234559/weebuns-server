import { Module } from '@nestjs/common';
import { ClassMemberService } from './class-member.service';
import { ClassMemberResolver } from './class-member.resolver';

@Module({
  providers: [ClassMemberResolver, ClassMemberService],
})
export class ClassMemberModule {}
