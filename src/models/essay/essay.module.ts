import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { EssayService } from 'src/models/essay/essay.service';
import { EssayController } from 'src/models/essay/restful/essay.controller';
import { HashtagService } from 'src/models/hashtag/hashtag.service';

@Module({
  imports: [PrismaModule],
  providers: [EssayService, HashtagService],
  exports: [EssayService],
  controllers: [EssayController],
})
export class EssayModule {}
