import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateQuizResponseDto } from 'src/models/quiz/dto/create-quiz-response.dto';
import { CreateQuizDto } from 'src/models/quiz/dto/create-quiz.dto';
import { DeleteQuizResponseDto } from 'src/models/quiz/dto/delete-quiz-response.dto';
import { QuizResponse } from 'src/models/quiz/dto/find-all-quiz-response.dto';
import { FindAllQuizDto } from 'src/models/quiz/dto/find-all-quiz.dto';
import { FindOneQuizResponseDto } from 'src/models/quiz/dto/find-one-quiz-response.dto';
import { UpdateQuizResponseDto } from 'src/models/quiz/dto/update-quiz-response.dto';
import { UpdateQuizDto } from 'src/models/quiz/dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto): Promise<CreateQuizResponseDto> {
    const { id_space, created_by, title } = createQuizDto;

    const space = await this.prisma.space.findUnique({
      where: { id: id_space },
    });
    if (!space) {
      throw new NotFoundException(`Space with ID ${id_space} not found`);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: created_by },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${created_by} not found`);
    }

    const quiz = await this.prisma.quiz.create({
      data: {
        title,
        id_space,
        created_by,
      },
      include: {
        space: true,
        creator: true,
        questions: true,
      },
    });

    return {
      id: quiz.id,
      id_space: quiz.id_space,
      title: quiz.title,
      created_by: quiz.created_by,
      created_at: quiz.created_at,
      updated_at: quiz.updated_at,
      space: quiz.space,
      creator: quiz.creator,
    };
  }

  async findAll(findAllQuizDto: FindAllQuizDto): Promise<QuizResponse> {
    const { page, perPage, search } = findAllQuizDto;
    const skip = (page - 1) * perPage || 0;

    let where: Prisma.QuizWhereInput = {};

    if (search) {
      where = {
        OR: [{ title: { contains: search, mode: 'insensitive' } }],
      };
    }

    const [quiz, totalItems] = await Promise.all([
      this.prisma.quiz.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.quiz.count({ where }),
    ]);

    const pagination = calculatePagination(totalItems, findAllQuizDto);

    return {
      data: quiz,
      pagination,
    };
  }

  async findOne(id: string): Promise<FindOneQuizResponseDto> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        creator: true,
        space: true,
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return { quiz };
  }

  async update(
    id: string,
    updateQuizDto: UpdateQuizDto,
  ): Promise<UpdateQuizResponseDto> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    const updatedQuiz = await this.prisma.quiz.update({
      where: { id },
      data: updateQuizDto,
      include: {
        space: true,
        creator: true,
        questions: true,
      },
    });

    return {
      id: updatedQuiz.id,
      id_space: updatedQuiz.id_space,
      title: updatedQuiz.title,
      created_by: updatedQuiz.created_by,
      created_at: updatedQuiz.created_at,
      updated_at: updatedQuiz.updated_at,
      space: updatedQuiz.space || undefined,
      creator: updatedQuiz.creator || undefined,
    };
  }

  async delete(id: string): Promise<DeleteQuizResponseDto> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    await this.prisma.quiz.delete({
      where: { id },
    });

    return {
      message: `Quiz with ID ${id} has been successfully deleted.`,
    };
  }
}
