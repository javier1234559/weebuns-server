import { Module } from '@nestjs/common';

import { VocabularyController } from 'src/models/vocabulary/restful/vocabulary.controller';
import { VocabularyService } from 'src/models/vocabulary/vocabulary.service';

@Module({
  providers: [VocabularyService],
  exports: [VocabularyService],
  controllers: [VocabularyController],
})
export class VocabularyModule {}
