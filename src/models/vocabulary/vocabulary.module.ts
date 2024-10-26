import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { VocabularyController } from 'src/models/vocabulary/restful/vocabulary.controller';
import { VocabularyService } from 'src/models/vocabulary/vocabulary.service';

@Module({
  imports: [PrismaModule],
  providers: [VocabularyService],
  exports: [VocabularyService],
  controllers: [VocabularyController],
})
export class VocabularyModule {}
