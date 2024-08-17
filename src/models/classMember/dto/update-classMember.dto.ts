
import {ClassMemberRole} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateClassMemberDto {
  @ApiProperty({ enum: ClassMemberRole})
role?: ClassMemberRole;
}
