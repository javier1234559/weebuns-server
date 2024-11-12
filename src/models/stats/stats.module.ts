import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { StatsController } from 'src/models/stats/stats.controller';
import { StatsService } from 'src/models/stats/stats.service';

@Module({
  imports: [PrismaModule],
  providers: [StatsService],
  exports: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {}
