import { ApiProperty } from '@nestjs/swagger';

export class CourseCreatorDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  username: string;

  @ApiProperty({ type: 'string', nullable: true })
  profilePicture: string | null;
}
