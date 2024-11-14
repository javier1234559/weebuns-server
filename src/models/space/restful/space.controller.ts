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
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import { DeleteSpaceResponseDto } from 'src/models/space/dto/delete-space-response.dto';
import { FindAllSpacesDto } from 'src/models/space/dto/find-all-spaces.dto';
import { FindOneSpaceResponseDto } from 'src/models/space/dto/find-one-space-response.dto';
import { SpacesResponse } from 'src/models/space/dto/spaces-response.dto';
import { UpdateSpaceDto } from 'src/models/space/dto/update-space.dto';
import { SpaceService } from 'src/models/space/space.service';

@Controller('spaces')
@ApiTags('spaces')
@UseGuards(AuthGuard, RolesGuard)
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({ status: HttpStatus.OK, type: SpacesResponse })
  async findAll(@Query() query: FindAllSpacesDto): Promise<SpacesResponse> {
    return this.spaceService.findAll(query);
  }
  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: FindOneSpaceResponseDto })
  async findOne(@Param('id') id: string): Promise<FindOneSpaceResponseDto> {
    return this.spaceService.findOne(id);
  }
  @Post()
  @Roles(UserRole.USER)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FindOneSpaceResponseDto,
  })
  async create(
    @CurrentUser() user: IAuthPayload,
    @Body() dto: CreateSpaceDto,
  ): Promise<FindOneSpaceResponseDto> {
    return this.spaceService.create(dto, user);
  }
  @Patch(':id')
  @Roles(UserRole.USER)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: FindOneSpaceResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSpaceDto,
  ): Promise<FindOneSpaceResponseDto> {
    return this.spaceService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.USER)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteSpaceResponseDto })
  async delete(@Param('id') id: string): Promise<DeleteSpaceResponseDto> {
    return this.spaceService.delete(id);
  }
}
