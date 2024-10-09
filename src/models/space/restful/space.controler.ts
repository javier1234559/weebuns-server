import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from 'src/common/auth/role.guard';
import { UserRole } from 'src/common/type/enum';
import {
  FindAllSpacesDto,
  SpacesResponse,
} from 'src/models/space/dto/find-all-space.dto';
import { SpaceService } from 'src/models/space/space.service';

@Controller('spaces')
@ApiTags('spaces')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  // @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get()
  async findAll(
    @Query() findAllSpacesDto: FindAllSpacesDto,
  ): Promise<SpacesResponse> {
    return this.spaceService.findAll(findAllSpacesDto);
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(SpaceRole.ADMIN)
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.spaceService.findOne(+id);
  // }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(SpaceRole.ADMIN)
  // @Post()
  // async create(@Body() createSpaceDto: CreateSpaceDto) {
  //   return this.spaceService.create(createSpaceDto);
  // }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(SpaceRole.ADMIN)
  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateSpaceDto: UpdateSpaceDto,
  // ) {
  //   return this.spaceService.update(+id, updateSpaceDto);
  // }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(SpaceRole.ADMIN)
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.spaceService.remove(+id);
  // }
}
