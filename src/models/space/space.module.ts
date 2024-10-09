import { Module } from '@nestjs/common';

import { SpaceController } from 'src/models/space/restful/space.controler';
import { SpaceService } from 'src/models/space/space.service';

@Module({
  providers: [SpaceService],
  exports: [SpaceService],
  controllers: [SpaceController],
})
export class SpaceModule {}
