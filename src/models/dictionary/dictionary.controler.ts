import { Get, HttpStatus, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

import { DictionaryService } from 'src/models/dictionary/dictionary.service';
import {
  SearchSentenceQueryDto,
  SearchSentenceResponseDto,
} from 'src/models/dictionary/dto/dictionary.dto';

@Controller('dictionary')
@ApiTags('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get('search')
  @ApiResponse({ status: HttpStatus.OK, type: SearchSentenceResponseDto })
  async searchSentences(
    @Query() query: SearchSentenceQueryDto,
  ): Promise<SearchSentenceResponseDto> {
    return this.dictionaryService.searchSentences(query);
  }
}
