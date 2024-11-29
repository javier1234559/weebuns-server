import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { LessonService } from 'src/models/lesson/lesson.service';

@Module({
  imports: [PrismaModule],
  providers: [LessonService],
  exports: [LessonService],
  controllers: [],
})
export class LessonModule {}
