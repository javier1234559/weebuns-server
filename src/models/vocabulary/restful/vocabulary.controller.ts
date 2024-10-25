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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard } from 'src/common/auth/role.guard';
import { UserRole } from 'src/common/type/enum';
import { CreateVocabularyResponseDto } from 'src/models/vocabulary/dto/create-vocabulary-response.dto';
import { CreateVocabularyDto } from 'src/models/vocabulary/dto/create-vocabulary.dto';
import { DeleteVocabularyResponseDto } from 'src/models/vocabulary/dto/delete-vocabulary-response.dto';
import { FindAllVocabularyDto } from 'src/models/vocabulary/dto/find-all-vocabulary.dto';
import { FindOneVocabularyResponseDto } from 'src/models/vocabulary/dto/find-one-vocabulary-response.dto';
import { UpdateVocabularyResponseDto } from 'src/models/vocabulary/dto/update-vocabulary-response.dto';
import { UpdateVocabularyDto } from 'src/models/vocabulary/dto/update-vocabulary.dto';
import { VocabularyResponse } from 'src/models/vocabulary/dto/vocabulary-response.dto';
import { VocabularyService } from 'src/models/vocabulary/vocabulary.service';

@Controller('vocabularys')
@ApiTags('vocabularys')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Post()
  @ApiOperation({ summary: 'Create a new vocabulary' })
  @ApiResponse({
    status: 201,
    description: 'The vocabulary has been successfully created.',
    type: CreateVocabularyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User or Space not found.' })
  async create(
    @Body() createVocabularyDto: CreateVocabularyDto,
  ): Promise<CreateVocabularyResponseDto> {
    return this.vocabularyService.create(createVocabularyDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get()
  @ApiOperation({ summary: 'Get all vocabularies' })
  @ApiResponse({
    status: 200,
    description: 'Return all vocabularies.',
    type: VocabularyResponse,
  })
  async findAll(
    @Query() findAllVocabulariesDto: FindAllVocabularyDto,
  ): Promise<VocabularyResponse> {
    return this.vocabularyService.findAll(findAllVocabulariesDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get(':id')
  @ApiOperation({ summary: 'Get a vocabulary by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the vocabulary.',
    type: FindOneVocabularyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Vocabulary not found.' })
  async findOne(
    @Param('id') id: string,
  ): Promise<FindOneVocabularyResponseDto> {
    const vocabularyId = parseInt(id, 10); // Chuyển đổi id từ chuỗi thành số nguyên
    return this.vocabularyService.findOne(vocabularyId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a vocabulary by ID' })
  @ApiResponse({
    status: 200,
    description: 'The vocabulary has been successfully updated.',
    type: UpdateVocabularyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Vocabulary not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateVocabularyDto: UpdateVocabularyDto,
  ): Promise<UpdateVocabularyResponseDto> {
    const vocabularyId = parseInt(id, 10); // Chuyển đổi id từ chuỗi thành số nguyên
    return this.vocabularyService.update(vocabularyId, updateVocabularyDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vocabulary by ID' })
  @ApiResponse({
    status: 200,
    description: 'The vocabulary has been successfully deleted.',
    type: DeleteVocabularyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Vocabulary not found.' })
  async delete(@Param('id') id: string): Promise<DeleteVocabularyResponseDto> {
    const vocabularyId = parseInt(id, 10); // Lấy id từ DTO
    return this.vocabularyService.delete(vocabularyId);
  }
}
