import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CreateNoteDto } from 'src/models/note/dto/create-note.dto';
import { NotesResponse } from 'src/models/note/dto/find-all-note-response.dto';
import { FindAllNotesDto } from 'src/models/note/dto/find-all-notes.dto';
import { FindOneNoteResponseDto } from 'src/models/note/dto/find-one-note-response.dto';
import { UpdateNoteDto } from 'src/models/note/dto/update-note.dto';
import { NoteService } from 'src/models/note/note.service';

@Controller('notes')
@ApiTags('notes')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.USER)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FindOneNoteResponseDto,
  })
  async create(
    @CurrentUser() currentUser: IAuthPayload,
    @Body() dto: CreateNoteDto,
  ): Promise<FindOneNoteResponseDto> {
    return this.noteService.create(dto, currentUser);
  }

  @Post('upsert')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FindOneNoteResponseDto,
  })
  async createOrUpdate(
    @CurrentUser() currentUser: IAuthPayload,
    @Body() dto: CreateNoteDto,
  ): Promise<FindOneNoteResponseDto> {
    return this.noteService.createOrUpdate(dto, currentUser);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: NotesResponse,
  })
  async findAll(@Query() query: FindAllNotesDto): Promise<NotesResponse> {
    return this.noteService.findAll(query);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindOneNoteResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateNoteDto,
  ): Promise<FindOneNoteResponseDto> {
    return this.noteService.update(id, dto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindOneNoteResponseDto,
  })
  async delete(@Param('id') id: string): Promise<FindOneNoteResponseDto> {
    return this.noteService.delete(id);
  }
}
