import { ApiProperty } from '@nestjs/swagger';

export class CourseContentDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'string' })
  contentType: string;

  @ApiProperty({ type: 'number' })
  orderIndex: number;

  @ApiProperty({ type: 'boolean' })
  isPremium: boolean;

  @ApiProperty({ type: 'boolean' })
  isRequired: boolean;

  @ApiProperty({ type: 'number' })
  completeWeight: number;

  @ApiProperty({ type: 'boolean' })
  isDone: boolean;
}
