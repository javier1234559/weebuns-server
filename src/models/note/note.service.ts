import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import {
  notDeletedQuery,
  paginationQuery,
  searchQuery,
} from 'src/common/helper/prisma-queries.helper';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateNoteDto } from 'src/models/note/dto/create-note.dto';
import { NotesResponse } from 'src/models/note/dto/find-all-note-response.dto';
import { FindAllNotesDto } from 'src/models/note/dto/find-all-notes.dto';
import { FindOneNoteResponseDto } from 'src/models/note/dto/find-one-note-response.dto';
import { UpdateNoteDto } from 'src/models/note/dto/update-note.dto';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly includeQuery = {
    space: true,
    unit: true,
  } as const;

  async createOrUpdate(
    dto: CreateNoteDto,
    currentUser: IAuthPayload,
  ): Promise<FindOneNoteResponseDto> {
    const space = await this.prisma.space.findFirst({
      where: { id: dto.spaceId, ...notDeletedQuery },
    });
    if (!space) throw new NotFoundException(`Space ${dto.spaceId} not found`);

    const unit = await this.prisma.unit.findFirst({
      where: { id: dto.unitId },
    });
    if (!unit) throw new NotFoundException(`Unit ${dto.unitId} not found`);

    const existingNote = await this.prisma.note.findFirst({
      where: {
        unitId: dto.unitId,
        createdBy: String(currentUser.sub),
        ...notDeletedQuery,
      },
    });

    const note = existingNote
      ? await this.prisma.note.update({
          where: { id: existingNote.id },
          data: {
            ...dto,
            tags: dto.tags as any,
          },
          include: this.includeQuery,
        })
      : await this.prisma.note.create({
          data: {
            ...dto,
            tags: dto.tags as any,
            createdBy: String(currentUser.sub),
          },
          include: this.includeQuery,
        });

    return { note };
  }

  async create(
    dto: CreateNoteDto,
    currentUser: IAuthPayload,
  ): Promise<FindOneNoteResponseDto> {
    const space = await this.prisma.space.findFirst({
      where: { id: dto.spaceId, ...notDeletedQuery },
    });
    if (!space) throw new NotFoundException(`Space ${dto.spaceId} not found`);

    const unit = await this.prisma.unit.findFirst({
      where: { id: dto.unitId },
    });
    if (!unit) throw new NotFoundException(`Unit ${dto.unitId} not found`);

    const note = await this.prisma.note.create({
      data: {
        ...dto,
        tags: dto.tags as any,
        createdBy: String(currentUser.sub),
      },
    });

    return { note };
  }

  async findAll(query: FindAllNotesDto): Promise<NotesResponse> {
    const { page, perPage, search, tags, isBookmarked, spaceId } = query;

    const where: Prisma.NoteWhereInput = {
      ...notDeletedQuery,
      ...(spaceId && { spaceId }),
      ...searchQuery(search, ['title', 'content']),
      ...(isBookmarked !== undefined && { isBookmarked }),
      ...(tags?.length && {
        tags: {
          array_contains: tags,
        },
      }),
    };

    const [notes, totalItems] = await Promise.all([
      this.prisma.note.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: this.includeQuery,
        ...paginationQuery(page, perPage),
      }),
      this.prisma.note.count({ where }),
    ]);

    return {
      data: notes,
      pagination: calculatePagination(totalItems, query),
    };
  }

  async update(
    id: string,
    dto: UpdateNoteDto,
  ): Promise<FindOneNoteResponseDto> {
    const note = await this.prisma.note.findFirst({
      where: { id, ...notDeletedQuery },
    });
    if (!note) throw new NotFoundException(`Note ${id} not found`);

    const updated = await this.prisma.note.update({
      where: { id },
      data: {
        ...dto,
        tags: dto.tags as any,
      },
    });

    return { note: updated };
  }

  async delete(id: string): Promise<FindOneNoteResponseDto> {
    const note = await this.prisma.note.findFirst({
      where: { id, ...notDeletedQuery },
    });
    if (!note) throw new NotFoundException(`Note ${id} not found`);

    const deleted = await this.prisma.note.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { note: deleted };
  }
}
