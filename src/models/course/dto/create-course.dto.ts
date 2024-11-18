import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  description?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  thumbnailUrl?: string | null;
  @ApiProperty({
    type: 'string',
  })
  language: string;
  @ApiProperty({
    type: 'string',
  })
  minLevel: string;
  @ApiProperty({
    type: 'string',
  })
  maxLevel: string;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  topics: string[];
  @ApiProperty({
    type: 'string',
  })
  courseType: string;
  @ApiProperty({
    type: 'number',
  })
  totalWeight: number;

  @ApiProperty({
    type: 'boolean',
  })
  isPublished: boolean;
}
