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
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Unauthorized - Invalid or missing authentication token',
})
@ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: 'Forbidden - User does not have required roles',
})
export class EssayController {
  constructor(private readonly essayService: EssayService) {}

  @Get()
  @Roles(UserRole.USER)
  @ApiOperation({
    summary: 'Get all essays',
    description: 'Retrieves all essays with pagination and filtering options',
  })
  @ApiQuery({
    type: FindAllEssaysDto,
    description: 'Query parameters for filtering and pagination',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Essays retrieved successfully',
    type: EssaysResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid query parameters',
  })
  async findAll(
    @Query() findAllEssaysDto: FindAllEssaysDto,
  ): Promise<EssaysResponse> {
    return this.essayService.findAll(findAllEssaysDto);
  }

  @Get(':id')
  @Roles(UserRole.USER)
  @ApiOperation({
    summary: 'Get essay by ID',
    description: 'Retrieves detailed information about a specific essay',
  })
  @ApiParam({
    name: 'id',
    description: 'Essay ID',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Essay found successfully',
    type: FindOneEssayResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Essay not found',
  })
  async findOne(
    @Param() params: FindOneEssayDto,
  ): Promise<FindOneEssayResponseDto> {
    return this.essayService.findOne(params.id);
  }

  @Post()
  @Roles(UserRole.USER)
  @ApiOperation({
    summary: 'Create a new essay',
    description: 'Creates a new essay with the provided content and metadata',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Essay created successfully',
    type: CreateEssayResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid essay data provided',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Essay with the same title already exists',
  })
  async create(
    @Body() createEssayDto: CreateEssayDto,
  ): Promise<CreateEssayResponseDto> {
    return this.essayService.create(createEssayDto);
  }

  @Patch(':id')
  @Roles(UserRole.USER)
  @ApiOperation({
    summary: 'Update essay by ID',
    description: 'Updates an existing essay with new content or metadata',
  })
  @ApiParam({
    name: 'id',
    description: 'Essay ID',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Essay updated successfully',
    type: UpdateEssayResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid update data provided',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Essay not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Update would create a duplicate essay title',
  })
  async update(
    @Param() params: FindOneEssayDto,
    @Body() updateEssayDto: UpdateEssayDto,
  ): Promise<UpdateEssayResponseDto> {
    console.log('updateEssayDto', updateEssayDto);
    return this.essayService.update(params.id, updateEssayDto);
  }

  @Delete(':id')
  @Roles(UserRole.USER)
  @ApiOperation({
    summary: 'Delete essay by ID',
    description: 'Permanently removes an essay and its associated content',
  })
  @ApiParam({
    name: 'id',
    description: 'Essay ID',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Essay deleted successfully',
    type: DeleteEssayResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Essay not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have permission to delete this essay',
  })
  async delete(
    @Param() params: FindOneEssayDto,
  ): Promise<DeleteEssayResponseDto> {
    return this.essayService.delete(params.id);
  }
}
