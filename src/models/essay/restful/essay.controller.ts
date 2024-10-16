import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard } from 'src/common/auth/role.guard';
import { UserRole } from 'src/common/type/enum';
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
export class EssayController {
  constructor(private readonly essayService: EssayService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get()
  async findAll(
    @Query() findAllEssaysDto: FindAllEssaysDto,
  ): Promise<EssaysResponse> {
    return this.essayService.findAll(findAllEssaysDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Get(':id')
  async findOne(
    @Param() params: FindOneEssayDto,
  ): Promise<FindOneEssayResponseDto> {
    return this.essayService.findOne(params.id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Post()
  async create(
    @Body() createEssayDto: CreateEssayDto,
  ): Promise<CreateEssayResponseDto> {
    return this.essayService.create(createEssayDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param() params: FindOneEssayDto,
    @Body() updateEssayDto: UpdateEssayDto,
  ): Promise<UpdateEssayResponseDto> {
    return this.essayService.update(params.id, updateEssayDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Delete(':id')
  async delete(
    @Param() params: FindOneEssayDto,
  ): Promise<DeleteEssayResponseDto> {
    return this.essayService.delete(params.id);
  }
}
