import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UnitContentService } from 'src/models/unit-content/unit-content.service';

@Module({
  imports: [PrismaModule],
  providers: [UnitContentService],
  exports: [UnitContentService],
  controllers: [],
})
export class UnitContentModule {}
