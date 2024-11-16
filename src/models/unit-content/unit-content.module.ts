import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UnitContentController } from 'src/models/unit-content/restful/unit-content.controller';
import { UnitContentService } from 'src/models/unit-content/unit-content.service';

@Module({
  imports: [PrismaModule],
  providers: [UnitContentService],
  exports: [UnitContentService],
  controllers: [UnitContentController],
})
export class UnitContentModule {}
