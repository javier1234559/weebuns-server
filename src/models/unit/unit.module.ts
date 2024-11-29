import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { LessonService } from 'src/models/lesson/lesson.service';
import { NoteService } from 'src/models/note/note.service';
import { UnitController } from 'src/models/unit/restful/unit.controller';
import { UnitService } from 'src/models/unit/unit.service';

@Module({
  imports: [PrismaModule],
  providers: [UnitService, NoteService, LessonService],
  exports: [UnitService, NoteService],
  controllers: [UnitController],
})
export class UnitModule {}
