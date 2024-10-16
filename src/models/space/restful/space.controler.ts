import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard } from 'src/common/auth/role.guard';
import { UserRole } from 'src/common/type/enum';
import { CreateSpaceResponseDto } from 'src/models/space/dto/create-space-response.dto';
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import { DeleteSpaceResponseDto } from 'src/models/space/dto/delete-space-response.dto';
import { FindAllSpacesDto } from 'src/models/space/dto/find-all-spaces.dto';
import { FindOneSpaceResponseDto } from 'src/models/space/dto/find-one-space-response.dto';
import { FindOneSpaceDto } from 'src/models/space/dto/find-one-space.dto';
import { SpacesResponse } from 'src/models/space/dto/spaces-response.dto';
import { UpdateSpaceResponseDto } from 'src/models/space/dto/update-space-response.dto';
import { UpdateSpaceDto } from 'src/models/space/dto/update-space.dto';
import { SpaceService } from 'src/models/space/space.service';

@Controller('spaces')
@ApiTags('spaces')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Get()
  async findAll(
    @Query() findAllSpacesDto: FindAllSpacesDto,
  ): Promise<SpacesResponse> {
    return this.spaceService.findAll(findAllSpacesDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Get(':id')
  async findOne(
    @Param() params: FindOneSpaceDto,
  ): Promise<FindOneSpaceResponseDto> {
    return this.spaceService.findOne(params.id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Post()
  async create(
    @Body() createSpaceDto: CreateSpaceDto,
  ): Promise<CreateSpaceResponseDto> {
    return this.spaceService.create(createSpaceDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Put(':id')
  async update(
    @Param() params: FindOneSpaceDto,
    @Body() updateSpaceDto: UpdateSpaceDto,
  ): Promise<UpdateSpaceResponseDto> {
    return this.spaceService.update(params.id, updateSpaceDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Delete(':id')
  async delete(
    @Param() params: FindOneSpaceDto,
  ): Promise<DeleteSpaceResponseDto> {
    return this.spaceService.delete(params.id);
  }
}
