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
import { CreateEssayResponseDto } from 'src/models/essay/dto/create-essay-response.dto';
import { CreateEssayDto } from 'src/models/essay/dto/create-essay.dto';
import { DeleteEssayResponseDto } from 'src/models/essay/dto/delete-space-response.dto';
import { EssaysResponse } from 'src/models/essay/dto/essay-response';
import { FindAllEssaysDto } from 'src/models/essay/dto/find-all-essay.dto';
import { FindOneEssayResponseDto } from 'src/models/essay/dto/find-one-essay-reponse.dto';
import { FindOneEssayDto } from 'src/models/essay/dto/find-one-essay.dto';
import { UpdateEssayDto } from 'src/models/essay/dto/update-essay.dto';
import { UpdateEssayResponseDto } from 'src/models/essay/dto/update-space-response.dto';
import { EssayService } from 'src/models/essay/essay.service';

@Controller('essays')
@ApiTags('essays')
@UseGuards(AuthGuard, RolesGuard)
export class EssayController {
  constructor(private readonly essayService: EssayService) {}

  @Get()
  @Roles(UserRole.USER)
  @ApiResponse({ status: HttpStatus.OK, type: EssaysResponse })
  async findAll(@Query() query: FindAllEssaysDto): Promise<EssaysResponse> {
    return this.essayService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.USER)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: FindOneEssayResponseDto })
  async findOne(
    @Param() params: FindOneEssayDto,
  ): Promise<FindOneEssayResponseDto> {
    return this.essayService.findOne(params.id);
  }

  @Post()
  @Roles(UserRole.USER)
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateEssayResponseDto })
  async create(@Body() dto: CreateEssayDto): Promise<CreateEssayResponseDto> {
    return this.essayService.create(dto);
  }

  @Patch(':id')
  @Roles(UserRole.USER)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateEssayResponseDto })
  async update(
    @Param() params: FindOneEssayDto,
    @Body() dto: UpdateEssayDto,
  ): Promise<UpdateEssayResponseDto> {
    return this.essayService.update(params.id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.USER)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteEssayResponseDto })
  async delete(
    @Param() params: FindOneEssayDto,
  ): Promise<DeleteEssayResponseDto> {
    return this.essayService.delete(params.id);
  }
}
