import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { HashtagService } from 'src/models/hashtag/hashtag.service';
import { HashtagController } from 'src/models/hashtag/restful/hashtag.controller';

@Module({
  imports: [PrismaModule],
  providers: [HashtagService],
  exports: [HashtagService],
  controllers: [HashtagController],
})
export class HashTagModule {}
