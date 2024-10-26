import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { SpaceController } from 'src/models/space/restful/space.controller';
import { SpaceService } from 'src/models/space/space.service';

@Module({
  imports: [PrismaModule],
  providers: [SpaceService],
  exports: [SpaceService],
  controllers: [SpaceController],
})
export class SpaceModule {}
