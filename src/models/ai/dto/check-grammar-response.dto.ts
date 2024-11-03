import { ApiProperty } from '@nestjs/swagger';

class CorrectionDto {
  @ApiProperty()
  original: string;

  @ApiProperty()
  corrected: string;

  @ApiProperty()
  explanation: string;

  @ApiProperty()
  type: 'grammar' | 'spelling' | 'punctuation' | 'style';

  @ApiProperty()
  position: {
    start: number;
    end: number;
  };
}

export class CheckGrammarResponseDto {
  @ApiProperty({ type: [CorrectionDto] })
  corrections: CorrectionDto[];

  @ApiProperty()
  summary: string;

  @ApiProperty()
  overall_score: number;
}
