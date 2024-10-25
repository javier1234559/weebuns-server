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
import { CreateQuizResponseDto } from 'src/models/quiz/dto/create-quiz-response.dto';
import { CreateQuizDto } from 'src/models/quiz/dto/create-quiz.dto';
import { DeleteQuizResponseDto } from 'src/models/quiz/dto/delete-quiz-response.dto';
import { QuizResponse } from 'src/models/quiz/dto/find-all-quiz-response.dto';
import { FindAllQuizDto } from 'src/models/quiz/dto/find-all-quiz.dto';
import { FindOneQuizResponseDto } from 'src/models/quiz/dto/find-one-quiz-response.dto';
import { UpdateQuizResponseDto } from 'src/models/quiz/dto/update-quiz-response.dto';
import { UpdateQuizDto } from 'src/models/quiz/dto/update-quiz.dto';
import { QuizService } from 'src/models/quiz/quiz.service';

@Controller('quizs')
@ApiTags('quizs')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiResponse({
    status: 201,
    description: 'The quiz has been successfully created.',
    type: CreateQuizResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User or Space not found.' })
  async create(
    @Body() createQuizDto: CreateQuizDto,
  ): Promise<CreateQuizResponseDto> {
    return this.quizService.create(createQuizDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get()
  @ApiOperation({ summary: 'Get all vocabularies' })
  @ApiResponse({
    status: 200,
    description: 'Return all vocabularies.',
    type: QuizResponse,
  })
  async findAll(
    @Query() findAllVocabulariesDto: FindAllQuizDto,
  ): Promise<QuizResponse> {
    return this.quizService.findAll(findAllVocabulariesDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get(':id')
  @ApiOperation({ summary: 'Get a Quiz by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the Quiz.',
    type: FindOneQuizResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  async findOne(@Param('id') id: string): Promise<FindOneQuizResponseDto> {
    const quizId = parseInt(id, 10); // Chuyển đổi id từ chuỗi thành số nguyên
    return this.quizService.findOne(quizId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a quiz by ID' })
  @ApiResponse({
    status: 200,
    description: 'The quiz has been successfully updated.',
    type: UpdateQuizResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ): Promise<UpdateQuizResponseDto> {
    const quizId = parseInt(id, 10); // Chuyển đổi id từ chuỗi thành số nguyên
    return this.quizService.update(quizId, updateQuizDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Quiz by ID' })
  @ApiResponse({
    status: 200,
    description: 'The Quiz has been successfully deleted.',
    type: DeleteQuizResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  async delete(@Param('id') id: string): Promise<DeleteQuizResponseDto> {
    const quizId = parseInt(id, 10); // Lấy id từ DTO
    return this.quizService.delete(quizId);
  }
}
