import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { RolesGuard } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles, UserRole } from 'src/common/decorators/role.decorator';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CreateLessonDto } from 'src/models/lesson/dto/create-lesson.dto';
import { LessonResponseDto } from 'src/models/lesson/dto/lesson-response.dto';
import { UpdateLessonDto } from 'src/models/lesson/dto/update-lesson.dto';
import { LessonService } from 'src/models/lesson/lesson.service';
import { FindOneNoteResponseDto } from 'src/models/note/dto/find-one-note-response.dto';
import { NoteService } from 'src/models/note/note.service';
import {
  BulkUpdateUnitsDto,
  BulkUpdateUnitsResponseDto,
} from 'src/models/unit/dto/bulk-update-units.dto';
import { CreateUnitDto } from 'src/models/unit/dto/create-unit.dto';
import { GetUnitResponseDto } from 'src/models/unit/dto/get-unit-response.dto';
import { UnitLearnResponseDto } from 'src/models/unit/dto/unit-learn.dto';
import { UpdateUnitDto } from 'src/models/unit/dto/update-unit.dto';
import { UnitService } from 'src/models/unit/unit.service';

@ApiTags('units')
@Controller('units')
@UseGuards(AuthGuard, RolesGuard)
export class UnitController {
  constructor(
    private readonly unitService: UnitService,
    private readonly noteService: NoteService,
    private readonly lessonService: LessonService,
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
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK, type: GetUnitResponseDto })
  async getUnit(@Param('id') unitId: string): Promise<GetUnitResponseDto> {
    return this.unitService.getUnit(unitId);
  }

  @Get(':id/learn')
  @Roles(UserRole.USER)
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

  @Get(':id/lessons/:lessonId/learn')
  @Roles(UserRole.USER)
  @ApiResponse({ status: HttpStatus.OK, type: LessonResponseDto })
  async learnLesson(
    @Param('id') id: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonService.lessonLearn(id, lessonId);
  }

  @Delete(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteUnit(@Param('id') unitId: string): Promise<GetUnitResponseDto> {
    return this.unitService.delete(unitId);
  }

  @Put('bulk-update')
  @Roles(UserRole.ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [BulkUpdateUnitsResponseDto],
    description: 'Bulk update units including reordering',
  })
  async bulkUpdateUnits(
    @Body() bulkUpdateDto: BulkUpdateUnitsDto,
  ): Promise<BulkUpdateUnitsResponseDto> {
    return this.unitService.bulkUpdate(bulkUpdateDto);
  }

  @Patch(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.OK, type: GetUnitResponseDto })
  async updateUnit(
    @Param('id') unitId: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ): Promise<GetUnitResponseDto> {
    return this.unitService.update(unitId, updateUnitDto);
  }

  @Get(':id/lessons/:lessonId/note')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.OK, type: FindOneNoteResponseDto })
  async getLessonNote(
    @Param('id') unitId: string,
    @CurrentUser() user: IAuthPayload,
    @Param('lessonId') lessonId: string,
  ): Promise<FindOneNoteResponseDto> {
    const userId = String(user.sub);
    return this.noteService.findOneByLessonId(userId, lessonId);
  }

  @Get(':id/lessons/:lessonId')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.OK, type: LessonResponseDto })
  async getLesson(
    @Param('id') unitId: string,
    @Param('lessonId') lessonId: string,
  ): Promise<LessonResponseDto> {
    return this.lessonService.findOneAndCheck(unitId, lessonId);
  }

  @Post(':id/lessons')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.CREATED, type: LessonResponseDto })
  async createLesson(
    @Param('id') unitId: string,
    @CurrentUser() user: IAuthPayload,
    @Body() createLessonDto: CreateLessonDto,
  ): Promise<LessonResponseDto> {
    const userId = String(user.sub);
    return this.lessonService.create(unitId, createLessonDto, userId);
  }

  @Patch(':id/lessons/:lessonId')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.OK, type: LessonResponseDto })
  async updateLesson(
    @Param('id') unitId: string,
    @Param('lessonId') lessonId: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<LessonResponseDto> {
    return this.lessonService.update(unitId, lessonId, updateLessonDto);
  }

  @Delete(':id/lessons/:lessonId')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteLesson(
    @Param('id') unitId: string,
    @Param('lessonId') lessonId: string,
  ): Promise<LessonResponseDto> {
    return this.lessonService.delete(unitId, lessonId);
  }
}
