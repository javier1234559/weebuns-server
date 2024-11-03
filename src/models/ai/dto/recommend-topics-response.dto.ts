import { ApiProperty } from '@nestjs/swagger';

class TopicDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}

export class RecommendTopicsResponseDto {
  @ApiProperty({ type: [TopicDto] })
  topics: TopicDto[];

  @ApiProperty()
  category: string;

  @ApiProperty()
  count: number;
}
