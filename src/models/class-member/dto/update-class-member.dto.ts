import { ApiProperty } from '@nestjs/swagger';

import { ClassMemberRole } from '@prisma/client';

export class UpdateClassMemberDto {
  @ApiProperty({ enum: ClassMemberRole })
  role?: ClassMemberRole;
}
