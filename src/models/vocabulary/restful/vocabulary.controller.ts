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
import { CreateVocabularyDto } from 'src/models/vocabulary/dto/create-vocabulary.dto';
import { FindAllVocabularyDto } from 'src/models/vocabulary/dto/find-all-vocabulary.dto';
import { FindOneVocabularyResponseDto } from 'src/models/vocabulary/dto/find-one-vocabulary-response.dto';
import { UpdateVocabularyDto } from 'src/models/vocabulary/dto/update-vocabulary.dto';
import { VocabularyResponse } from 'src/models/vocabulary/dto/vocabulary-response.dto';
import { VocabularyService } from 'src/models/vocabulary/vocabulary.service';

@Controller('vocabularies')
@ApiTags('vocabularies')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.USER)
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FindOneVocabularyResponseDto,
  })
  async create(
    @CurrentUser() currentUser: IAuthPayload,
    @Body() createVocabularyDto: CreateVocabularyDto,
  ): Promise<FindOneVocabularyResponseDto> {
    return this.vocabularyService.create(createVocabularyDto, currentUser);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindAllVocabularyDto,
  })
  async findAll(
    @Query() findAllVocabulariesDto: FindAllVocabularyDto,
  ): Promise<VocabularyResponse> {
    return this.vocabularyService.findAll(findAllVocabulariesDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindOneVocabularyResponseDto,
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<FindOneVocabularyResponseDto> {
    return this.vocabularyService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindOneVocabularyResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateVocabularyDto: UpdateVocabularyDto,
  ): Promise<FindOneVocabularyResponseDto> {
    return this.vocabularyService.update(id, updateVocabularyDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindOneVocabularyResponseDto,
  })
  async delete(@Param('id') id: string): Promise<FindOneVocabularyResponseDto> {
    return this.vocabularyService.delete(id);
  }
}
