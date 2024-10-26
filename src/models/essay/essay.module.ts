import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { EssayService } from 'src/models/essay/essay.service';
import { EssayController } from 'src/models/essay/restful/essay.controller';

@Module({
  imports: [PrismaModule],
  providers: [EssayService],
  exports: [EssayService],
  controllers: [EssayController],
})
export class EssayModule {}
