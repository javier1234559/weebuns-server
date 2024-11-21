import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { NoteController } from 'src/models/note/note.controler';
import { NoteService } from 'src/models/note/note.service';

@Module({
  imports: [PrismaModule],
  providers: [NoteService],
  exports: [NoteService],
  controllers: [NoteController],
})
export class NoteModule {}
