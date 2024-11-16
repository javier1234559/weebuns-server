import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateNoteDto } from 'src/models/note/dto/create-note.dto';
import {
  CreateUpdateNoteResponseDto,
  NoteResponseDto,
} from 'src/models/note/dto/note-response.dto';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdateNote(
    unitId: string,
    user: IAuthPayload,
    createNoteDto: CreateNoteDto,
  ): Promise<CreateUpdateNoteResponseDto> {
    try {
      const existingNote = await this.prisma.note.findFirst({
        where: {
          unitId,
          createdBy: user.sub.toString(),
        },
      });

      let note;
      let status;

      if (existingNote) {
        note = await this.prisma.note.update({
          where: { id: existingNote.id },
          data: {
            title: createNoteDto.title,
            content: createNoteDto.content,
            tags: createNoteDto.tags,
          },
        });
        status = 'updated';
      } else {
        note = await this.prisma.note.create({
          data: {
            unitId,
            title: createNoteDto.title,
            content: createNoteDto.content,
            tags: createNoteDto.tags,
            createdBy: user.sub.toString(),
          },
        });
        status = 'created';
      }

      const noteResponse: NoteResponseDto = {
        id: note.id,
        title: note.title,
        content: note.content,
        tags: note.tags as string[],
        isBookmarked: note.isBookmarked,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      };

      return { status, note: noteResponse };
    } catch (error) {
      console.error('Error in createOrUpdateNote:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
