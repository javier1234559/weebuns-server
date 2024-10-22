import { Module } from '@nestjs/common';

import { EssayService } from 'src/models/essay/essay.service';
import { EssayController } from 'src/models/essay/restful/essay.controller';

@Module({
  providers: [EssayService],
  exports: [EssayService],
  controllers: [EssayController],
})
export class EssayModule {}
