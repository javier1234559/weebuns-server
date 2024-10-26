import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateQuizQuestionResponseDto } from 'src/models/quiz-question/dto/create-quiz-question-response.dto';
import { CreateQuizQuestionDto } from 'src/models/quiz-question/dto/create-quiz-question.dto';
import { DeleteQuizQuestionResponseDto } from 'src/models/quiz-question/dto/delete-quiz-question-response.dto';
import { QuizQuestionResponse } from 'src/models/quiz-question/dto/find-all-quiz-question-response.dto';
import { FindAllQuizQuestionDto } from 'src/models/quiz-question/dto/find-all-quiz-question.dto';
import { FindOneQuizQuestionResponseDto } from 'src/models/quiz-question/dto/find-one-quiz-question-response.dto';
import { UpdateQuizQuestionResponseDto } from 'src/models/quiz-question/dto/update-quiz-question-response.dto';
import { UpdateQuizQuestionDto } from 'src/models/quiz-question/dto/update-quiz-question.dto';

@Injectable()
export class QuizQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuestion(
    quizId: string,
    createQuizQuestionDto: CreateQuizQuestionDto,
  ): Promise<CreateQuizQuestionResponseDto> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    const quizQuestion = await this.prisma.quizQuestion.create({
      data: {
        quiz: { connect: { id: quizId } },
        ...createQuizQuestionDto,
      },
      include: {
        quiz: true,
      },
    });

    return {
      id: quizQuestion.id,
      quiz_id: quizQuestion.quiz_id,
      question_text: quizQuestion.question_text,
      correct_answer: quizQuestion.correct_answer,
      user_answer: quizQuestion.user_answer,
      is_correct: quizQuestion.is_correct,
      id_vocabulary: quizQuestion.id_vocabulary?.toString(),
      created_at: quizQuestion.created_at,
      updated_at: quizQuestion.updated_at,
    };
  }

  async findAll(
    quizId: string,
    findAllQuizQuestionDto: FindAllQuizQuestionDto,
  ): Promise<QuizQuestionResponse> {
    const { page, perPage, search } = findAllQuizQuestionDto;
    const skip = (page - 1) * perPage || 0;

    let where: Prisma.QuizQuestionWhereInput = { quiz_id: quizId };

    if (search) {
      where = {
        ...where,
        OR: [{ question_text: { contains: search, mode: 'insensitive' } }],
      };
    }

    const [quizQuestions, totalItems] = await Promise.all([
      this.prisma.quizQuestion.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.quizQuestion.count({ where }),
    ]);

    const pagination = calculatePagination(totalItems, findAllQuizQuestionDto);

    return {
      data: quizQuestions,
      pagination,
    };
  }

  async findOne(
    quizId: string,
    id: string,
  ): Promise<FindOneQuizQuestionResponseDto> {
    const quizQuestion = await this.prisma.quizQuestion.findFirst({
      where: { id, quiz_id: quizId },
      include: {
        quiz: true,
      },
    });

    if (!quizQuestion) {
      throw new NotFoundException(
        `QuizQuestion with ID ${id} not found in Quiz with ID ${quizId}`,
      );
    }

    return { quizQuestion };
  }

  async update(
    id: string,
    updateQuizQuestionDto: UpdateQuizQuestionDto,
  ): Promise<UpdateQuizQuestionResponseDto> {
    const quizQuestion = await this.prisma.quizQuestion.findUnique({
      where: { id },
      include: { quiz: true },
    });

    if (!quizQuestion) {
      throw new NotFoundException(`QuizQuestion with ID ${id} not found`);
    }

    const updatedQuizQuestion = await this.prisma.quizQuestion.update({
      where: { id },
      data: updateQuizQuestionDto,
      include: { quiz: true },
    });

    return {
      id: updatedQuizQuestion.id,
      quiz_id: updatedQuizQuestion.quiz_id,
      question_text: updatedQuizQuestion.question_text,
      correct_answer: updatedQuizQuestion.correct_answer,
      user_answer: updatedQuizQuestion.user_answer,
      is_correct: updatedQuizQuestion.is_correct,
      id_vocabulary: updatedQuizQuestion.id_vocabulary,
      created_at: updatedQuizQuestion.created_at,
      updated_at: updatedQuizQuestion.updated_at,
      quiz: updatedQuizQuestion.quiz,
    };
  }

  async delete(id: string): Promise<DeleteQuizQuestionResponseDto> {
    const quizQuestion = await this.prisma.quizQuestion.findUnique({
      where: { id },
    });

    if (!quizQuestion) {
      throw new NotFoundException(`QuizQuestion with ID ${id} not found`);
    }

    await this.prisma.quizQuestion.delete({
      where: { id },
    });

    return {
      message: `QuizQuestion with ID ${id} has been successfully deleted.`,
    };
  }
}
