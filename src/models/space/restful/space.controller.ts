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
import { SpaceCoursesJoinedResponseDto } from 'src/models/space/dto/course-joined.dto';
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import { DeleteSpaceResponseDto } from 'src/models/space/dto/delete-space-response.dto';
import { ExploreCoursesQueryDto } from 'src/models/space/dto/explore-course-query.dto';
import { FindAllSpacesDto } from 'src/models/space/dto/find-all-spaces.dto';
import { FindOneSpaceResponseDto } from 'src/models/space/dto/find-one-space-response.dto';
import { GetSpacesUserDto } from 'src/models/space/dto/get-space-user.dto';
import { SpaceCoursesAllResponseDto } from 'src/models/space/dto/space-course-all-response.dto';
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

  @Get('user')
  @Roles(UserRole.USER)
  @ApiResponse({ status: HttpStatus.OK, type: SpacesResponse })
  async getUserSpaces(
    @CurrentUser() user: IAuthPayload,
    @Query() query: GetSpacesUserDto,
  ): Promise<SpacesResponse> {
    return this.spaceService.getSpacesUser(user.sub.toString(), query);
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

  @Get(':id/courses/joined')
  @Roles(UserRole.USER)
  @ApiResponse({
    status: 200,
    type: SpaceCoursesJoinedResponseDto,
  })
  async getSpaceCoursesJoined(
    @CurrentUser() user: IAuthPayload,
    @Param('id') spaceId: string,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ): Promise<SpaceCoursesJoinedResponseDto> {
    const userId = String(user.sub);
    const validPage = page > 0 ? page : 1;
    const validPerPage = perPage > 0 ? perPage : 10;
    return this.spaceService.getSpaceCoursesJoined(
      userId,
      spaceId,
      validPage,
      validPerPage,
    );
  }

  @Get(':id/courses/explore')
  @Roles(UserRole.USER)
  @ApiResponse({
    status: 200,
    type: SpaceCoursesAllResponseDto,
  })
  async getSpaceCourses(
    @CurrentUser() user: IAuthPayload,
    @Param('id') spaceId: string,
    @Query() query: ExploreCoursesQueryDto,
  ): Promise<SpaceCoursesAllResponseDto> {
    const userId = String(user.sub);
    return this.spaceService.getSpaceCourses(userId, spaceId, {
      ...query,
      page: query.page > 0 ? query.page : 1,
      perPage: query.perPage > 0 ? query.perPage : 10,
    });
  }
}
