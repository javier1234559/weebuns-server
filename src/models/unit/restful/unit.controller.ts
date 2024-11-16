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
import { CreateUnitResponseDto } from 'src/models/unit/dto/create-unit-response.dto';
import { CreateUnitDto } from 'src/models/unit/dto/create-unit.dto';
import { GetUnitContentsResponseDto } from 'src/models/unit/dto/get-unit-contents-response.dto';
import { GetUnitResponseDto } from 'src/models/unit/dto/get-unit-response.dto';
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
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateUnitResponseDto })
  async createUnit(
    @Body() createUnitDto: CreateUnitDto,
    @CurrentUser() user: IAuthPayload,
  ): Promise<CreateUnitResponseDto> {
    return this.unitService.create(createUnitDto, user);
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @CacheTTL(300) // Cache for 5 minutes
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the Unit to retrieve',
  })
  @ApiResponse({ status: HttpStatus.OK, type: GetUnitResponseDto })
  async getUnit(
    @Param('id') unitId: string,
    @CurrentUser() user: IAuthPayload,
  ): Promise<GetUnitResponseDto> {
    const userId = user.sub.toString(); // Assuming 'sub' is the userId in IAuthPayload
    return this.unitService.getUnit(unitId, userId);
  }

  @Get(':id/unit-contents')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @CacheTTL(300) // Cache for 5 minutes
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the Unit to retrieve contents for',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [GetUnitContentsResponseDto] })
  async getUnitContents(
    @Param('id') unitId: string,
  ): Promise<GetUnitContentsResponseDto[]> {
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
}
