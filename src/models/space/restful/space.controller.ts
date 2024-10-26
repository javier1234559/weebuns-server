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
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CreateSpaceResponseDto } from 'src/models/space/dto/create-space-response.dto';
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import { DeleteSpaceResponseDto } from 'src/models/space/dto/delete-space-response.dto';
import { FindAllSpacesDto } from 'src/models/space/dto/find-all-spaces.dto';
import { FindOneSpaceResponseDto } from 'src/models/space/dto/find-one-space-response.dto';
import { SpacesResponse } from 'src/models/space/dto/spaces-response.dto';
import { UpdateSpaceResponseDto } from 'src/models/space/dto/update-space-response.dto';
import { UpdateSpaceDto } from 'src/models/space/dto/update-space.dto';
import { SpaceService } from 'src/models/space/space.service';

@Controller('spaces')
@ApiTags('spaces')
@UseGuards(AuthGuard, RolesGuard)
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Unauthorized - Invalid or missing authentication token',
})
@ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: 'Forbidden - User does not have required roles',
})
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all spaces with pagination and filters' })
  @ApiQuery({
    type: FindAllSpacesDto,
    description: 'Query parameters for filtering and pagination',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Spaces retrieved successfully',
    type: SpacesResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid query parameters',
  })
  async findAll(
    @Query() findAllSpacesDto: FindAllSpacesDto,
  ): Promise<SpacesResponse> {
    return this.spaceService.findAll(findAllSpacesDto);
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get space by ID' })
  @ApiParam({
    name: 'id',
    description: 'Space ID',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Space found successfully',
    type: FindOneSpaceResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Space not found',
  })
  async findOne(@Param('id') id: string): Promise<FindOneSpaceResponseDto> {
    return this.spaceService.findOne(id);
  }

  @Post()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create new space' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Space created successfully',
    type: CreateSpaceResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid space data',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Space with the same name already exists',
  })
  async create(
    @Body() createSpaceDto: CreateSpaceDto,
  ): Promise<CreateSpaceResponseDto> {
    return this.spaceService.create(createSpaceDto);
  }

  @Patch(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update space by ID' })
  @ApiParam({
    name: 'id',
    description: 'Space ID',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Space updated successfully',
    type: UpdateSpaceResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid update data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Space not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateSpaceDto: UpdateSpaceDto,
  ): Promise<UpdateSpaceResponseDto> {
    return this.spaceService.update(id, updateSpaceDto);
  }

  @Delete(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete space by ID' })
  @ApiParam({
    name: 'id',
    description: 'Space ID',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Space deleted successfully',
    type: DeleteSpaceResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Space not found',
  })
  async delete(@Param('id') id: string): Promise<DeleteSpaceResponseDto> {
    return this.spaceService.delete(id);
  }
}
