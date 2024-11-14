import { ApiProperty } from '@nestjs/swagger';

export class UserOverviewDto {
  @ApiProperty({ example: 10 })
  essayCount: number;

  @ApiProperty({ example: 20 })
  vocabCount: number;

  @ApiProperty({ example: 5 })
  courseJoinedCount: number;

  @ApiProperty({ example: 15 })
  notesCount: number;
}
