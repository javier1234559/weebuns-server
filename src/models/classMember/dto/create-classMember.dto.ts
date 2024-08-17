
import {ClassMemberRole} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateClassMemberDto {
  @ApiProperty({ enum: ClassMemberRole})
role: ClassMemberRole;
}
