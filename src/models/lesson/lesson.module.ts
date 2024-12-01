import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { LessonService } from 'src/models/lesson/lesson.service';
import { LessonController } from 'src/models/lesson/restful/lesson.controler';

@Module({
  imports: [PrismaModule],
  providers: [LessonService],
  exports: [LessonService],
  controllers: [LessonController],
})
export class LessonModule {}
