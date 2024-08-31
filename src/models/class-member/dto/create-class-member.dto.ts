import { ApiProperty } from '@nestjs/swagger';

import { ClassMemberRole } from '@prisma/client';

export class CreateClassMemberDto {
  @ApiProperty({ enum: ClassMemberRole })
  role: ClassMemberRole;
}
