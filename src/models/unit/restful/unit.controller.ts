import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { NoteService } from 'src/models/note/note.service';
import { CreateUnitContentDto } from 'src/models/unit-content/dto/create-unit-content.dto';
import { UnitContentResponseDto } from 'src/models/unit-content/dto/unit-content-response.dto';
import { UpdateUnitContentDto } from 'src/models/unit-content/dto/update-unit-content.dto';
import { UnitContentService } from 'src/models/unit-content/unit-content.service';
import { CreateUnitDto } from 'src/models/unit/dto/create-unit.dto';
import { GetUnitContentsResponseDto } from 'src/models/unit/dto/get-unit-contents-response.dto';
import { GetUnitResponseDto } from 'src/models/unit/dto/get-unit-response.dto';
import { UnitLearnResponseDto } from 'src/models/unit/dto/unit-learn.dto';
import { UpdateUnitDto } from 'src/models/unit/dto/update-unit.dto';
import { UnitService } from 'src/models/unit/unit.service';

@ApiTags('Units')
@Controller('units')
@UseGuards(AuthGuard, RolesGuard)
export class UnitController {
  constructor(
    private readonly unitService: UnitService,
    private readonly noteService: NoteService,
    private readonly unitContentService: UnitContentService,
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

  @Delete(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteUnit(@Param('id') unitId: string): Promise<GetUnitResponseDto> {
    return this.unitService.delete(unitId);
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

  @Get(':id/unit-contents')
  @Roles(UserRole.USER, UserRole.ADMIN)
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

  @Get(':id/unit-contents/:unitContentId')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.OK, type: UnitContentResponseDto })
  async getUnitContent(
    @Param('id') unitId: string,
    @Param('unitContentId') contentId: string,
  ): Promise<UnitContentResponseDto> {
    return this.unitContentService.findOne(unitId, contentId);
  }

  @Post(':id/unit-contents')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.CREATED, type: UnitContentResponseDto })
  async createUnitContent(
    @Param('id') unitId: string,
    @Body() createUnitContentDto: CreateUnitContentDto,
  ): Promise<UnitContentResponseDto> {
    return this.unitContentService.create(unitId, createUnitContentDto);
  }

  @Patch(':id/unit-contents/:unitContentId')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.OK, type: UnitContentResponseDto })
  async updateUnitContent(
    @Param('id') unitId: string,
    @Param('unitContentId') contentId: string,
    @Body() updateUnitContentDto: UpdateUnitContentDto,
  ): Promise<UnitContentResponseDto> {
    return this.unitContentService.update(
      unitId,
      contentId,
      updateUnitContentDto,
    );
  }

  @Delete(':id/unit-contents/:unitContentId')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteUnitContent(
    @Param('id') unitId: string,
    @Param('unitContentId') contentId: string,
  ): Promise<UnitContentResponseDto> {
    return this.unitContentService.delete(unitId, contentId);
  }
}
