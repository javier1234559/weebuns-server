import { Module } from '@nestjs/common';

import { DictionaryController } from 'src/models/dictionary/dictionary.controler';
import { DictionaryService } from 'src/models/dictionary/dictionary.service';

@Module({
  controllers: [DictionaryController],
  providers: [DictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
