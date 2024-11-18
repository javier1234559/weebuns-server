import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CreateNoteDto } from 'src/models/note/dto/create-note.dto';
import { CreateUpdateNoteResponseDto } from 'src/models/note/dto/note-response.dto';
import { NoteService } from 'src/models/note/note.service';
import { CreateUnitDto } from 'src/models/unit/dto/create-unit.dto';
import { GetUnitContentsResponseDto } from 'src/models/unit/dto/get-unit-contents-response.dto';
import { GetUnitResponseDto } from 'src/models/unit/dto/get-unit-response.dto';
import { UnitLearnResponseDto } from 'src/models/unit/dto/unit-learn.dto';
import { UnitService } from 'src/models/unit/unit.service';

@ApiTags('Units')
@Controller('units')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(CacheInterceptor)
export class UnitController {
  constructor(
    private readonly unitService: UnitService,
    private readonly noteService: NoteService,
  ) {}

  @Post()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.CREATED, type: GetUnitResponseDto })
  async createUnit(
    @Body() createUnitDto: CreateUnitDto,
    @CurrentUser() user: IAuthPayload,
  ): Promise<GetUnitResponseDto> {
    const userId = user.sub.toString();
    return this.unitService.create(createUnitDto, userId);
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @CacheTTL(300) // Cache for 5 minutes
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK, type: GetUnitResponseDto })
  async getUnit(@Param('id') unitId: string): Promise<GetUnitResponseDto> {
    return this.unitService.getUnit(unitId);
  }

  @Get(':id/unit-contents')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @CacheTTL(300) // Cache for 5 minutes
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK, type: [GetUnitContentsResponseDto] })
  async getUnitContents(
    @Param('id') unitId: string,
  ): Promise<GetUnitContentsResponseDto> {
    return this.unitService.getUnitContents(unitId);
  }

  @Post(':id/notes')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.OK, type: CreateUpdateNoteResponseDto })
  async createOrUpdateNote(
    @Param('id') unitId: string,
    @CurrentUser() user: IAuthPayload,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<CreateUpdateNoteResponseDto> {
    return this.noteService.createOrUpdateNote(unitId, user, createNoteDto);
  }

  @Get(':id/learn')
  @Roles(UserRole.USER)
  @CacheTTL(300) // Cache for 5 minutes
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UnitLearnResponseDto,
  })
  async learnUnit(@Param('id') unitId: string): Promise<UnitLearnResponseDto> {
    return this.unitService.getUnitForLearning(unitId);
  }
}
