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
import { CreateVocabularyResponseDto } from 'src/models/vocabulary/dto/create-vocabulary-response.dto';
import { CreateVocabularyDto } from 'src/models/vocabulary/dto/create-vocabulary.dto';
import { DeleteVocabularyResponseDto } from 'src/models/vocabulary/dto/delete-vocabulary-response.dto';
import { FindAllVocabularyDto } from 'src/models/vocabulary/dto/find-all-vocabulary.dto';
import { FindOneVocabularyResponseDto } from 'src/models/vocabulary/dto/find-one-vocabulary-response.dto';
import { UpdateVocabularyResponseDto } from 'src/models/vocabulary/dto/update-vocabulary-response.dto';
import { UpdateVocabularyDto } from 'src/models/vocabulary/dto/update-vocabulary.dto';
import { VocabularyResponse } from 'src/models/vocabulary/dto/vocabulary-response.dto';
import { VocabularyService } from 'src/models/vocabulary/vocabulary.service';

@Controller('vocabularies')
@ApiTags('vocabularies')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.USER)
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Unauthorized - Invalid or missing authentication token',
})
@ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: 'Forbidden - User does not have required roles',
})
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new vocabulary',
    description: 'Creates a new vocabulary entry in the specified space',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Vocabulary created successfully',
    type: CreateVocabularyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid vocabulary data provided',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User or Space not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Vocabulary with the same name already exists in the space',
  })
  async create(
    @Body() createVocabularyDto: CreateVocabularyDto,
  ): Promise<CreateVocabularyResponseDto> {
    return this.vocabularyService.create(createVocabularyDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all vocabularies',
    description:
      'Retrieves all vocabularies with pagination and filtering options',
  })
  @ApiQuery({
    type: FindAllVocabularyDto,
    description: 'Query parameters for filtering and pagination',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vocabularies retrieved successfully',
    type: FindAllVocabularyDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid query parameters',
  })
  async findAll(
    @Query() findAllVocabulariesDto: FindAllVocabularyDto,
  ): Promise<VocabularyResponse> {
    return this.vocabularyService.findAll(findAllVocabulariesDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get vocabulary by ID',
    description: 'Retrieves detailed information about a specific vocabulary',
  })
  @ApiParam({
    name: 'id',
    description: 'Vocabulary ID',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vocabulary found successfully',
    type: FindOneVocabularyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vocabulary not found',
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<FindOneVocabularyResponseDto> {
    return this.vocabularyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update vocabulary by ID',
    description: 'Updates an existing vocabulary with new data',
  })
  @ApiParam({
    name: 'id',
    description: 'Vocabulary ID',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vocabulary updated successfully',
    type: UpdateVocabularyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid update data provided',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vocabulary not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Update would create a duplicate vocabulary name in the space',
  })
  async update(
    @Param('id') id: string,
    @Body() updateVocabularyDto: UpdateVocabularyDto,
  ): Promise<UpdateVocabularyResponseDto> {
    return this.vocabularyService.update(id, updateVocabularyDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete vocabulary by ID',
    description: 'Permanently removes a vocabulary entry',
  })
  @ApiParam({
    name: 'id',
    description: 'Vocabulary ID',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vocabulary deleted successfully',
    type: DeleteVocabularyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vocabulary not found',
  })
  async delete(@Param('id') id: string): Promise<DeleteVocabularyResponseDto> {
    return this.vocabularyService.delete(id);
  }
}
