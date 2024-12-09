import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import axios from 'axios';

import {
  SearchSentenceQueryDto,
  SearchSentenceResponseDto,
} from './dto/dictionary.dto';

@Injectable()
export class DictionaryService {
  async searchSentences(
    query: SearchSentenceQueryDto,
  ): Promise<SearchSentenceResponseDto> {
    try {
      const response = await axios.get<SearchSentenceResponseDto>(
        `https://api.tracau.vn/WBBcwnwQpV89/s/${encodeURIComponent(query.query)}/en`,
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch dictionary data',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
