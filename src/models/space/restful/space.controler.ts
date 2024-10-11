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
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import {
  FindAllSpacesDto,
  SpacesResponse,
} from 'src/models/space/dto/find-all-space.dto';
import {
  FindOneSpaceDto,
  SpaceResponse,
} from 'src/models/space/dto/find-one-space.dto';
import { UpdateSpaceDto } from 'src/models/space/dto/update-space.dto';
import { Space } from 'src/models/space/entities/space.entity';
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
  async findOne(@Param() params: FindOneSpaceDto): Promise<SpaceResponse> {
    const space = await this.spaceService.findOne(Number(params.id)); // Chuyển đổi id thành số nguyên
    return { data: space };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Post()
  async create(@Body() createSpaceDto: CreateSpaceDto): Promise<Space> {
    return this.spaceService.create(createSpaceDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSpaceDto: UpdateSpaceDto,
  ): Promise<Space> {
    return this.spaceService.update(Number(id), updateSpaceDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Space> {
    return this.spaceService.delete(Number(id));
  }
}
