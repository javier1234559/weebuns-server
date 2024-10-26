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
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CreateQuizQuestionResponseDto } from 'src/models/quiz-question/dto/create-quiz-question-response.dto';
import { CreateQuizQuestionDto } from 'src/models/quiz-question/dto/create-quiz-question.dto';
import { DeleteQuizQuestionResponseDto } from 'src/models/quiz-question/dto/delete-quiz-question-response.dto';
import { QuizQuestionResponse } from 'src/models/quiz-question/dto/find-all-quiz-question-response.dto';
import { FindAllQuizQuestionDto } from 'src/models/quiz-question/dto/find-all-quiz-question.dto';
import { FindOneQuizQuestionResponseDto } from 'src/models/quiz-question/dto/find-one-quiz-question-response.dto';
import { UpdateQuizQuestionResponseDto } from 'src/models/quiz-question/dto/update-quiz-question-response.dto';
import { UpdateQuizQuestionDto } from 'src/models/quiz-question/dto/update-quiz-question.dto';
import { QuizQuestionService } from 'src/models/quiz-question/quiz-question.service';

@Controller('quizs')
@ApiTags('quizs')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Post(':quizId/questions')
  @ApiOperation({ summary: 'Create a new quiz question' })
  @ApiResponse({
    status: 201,
    description: 'The quiz question has been successfully created.',
    type: CreateQuizQuestionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  async createQuestion(
    @Param('quizId') quizId: string,
    @Body() createQuizQuestionDto: CreateQuizQuestionDto,
  ): Promise<CreateQuizQuestionResponseDto> {
    return this.quizQuestionService.createQuestion(
      quizId,
      createQuizQuestionDto,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get(':quizId/questions')
  @ApiOperation({ summary: 'Find all quiz questions' })
  @ApiResponse({
    status: 200,
    description: 'The quiz questions have been successfully retrieved.',
    type: QuizQuestionResponse,
  })
  async findAll(
    @Param('quizId') quizId: string,
    @Query() findAllQuizQuestionDto: FindAllQuizQuestionDto,
  ): Promise<QuizQuestionResponse> {
    return this.quizQuestionService.findAll(quizId, findAllQuizQuestionDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get(':quizId/questions/:id')
  @ApiOperation({ summary: 'Find one quiz question' })
  @ApiResponse({
    status: 200,
    description: 'The quiz question has been successfully retrieved.',
    type: FindOneQuizQuestionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'QuizQuestion not found.' })
  async findOne(
    @Param('quizId') quizId: string,
    @Param('id') id: string,
  ): Promise<FindOneQuizQuestionResponseDto> {
    return this.quizQuestionService.findOne(quizId, id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Patch('questions/:id')
  @ApiOperation({ summary: 'Update a quiz question' })
  @ApiResponse({
    status: 200,
    description: 'The quiz question has been successfully updated.',
    type: UpdateQuizQuestionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'QuizQuestion not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateQuizQuestionDto: UpdateQuizQuestionDto,
  ): Promise<UpdateQuizQuestionResponseDto> {
    return this.quizQuestionService.update(id, updateQuizQuestionDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Delete('questions/:id')
  @ApiOperation({ summary: 'Delete a quiz question' })
  @ApiResponse({
    status: 200,
    description: 'The quiz question has been successfully deleted.',
    type: DeleteQuizQuestionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'QuizQuestion not found.' })
  async delete(
    @Param('id') id: string,
  ): Promise<DeleteQuizQuestionResponseDto> {
    return this.quizQuestionService.delete(id);
  }
}
