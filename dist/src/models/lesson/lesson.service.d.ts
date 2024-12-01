import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateLessonDto } from 'src/models/lesson/dto/create-lesson.dto';
import { GetLessonResponseDto } from 'src/models/lesson/dto/get-lesson-response.dto';
import { LessonResponseDto } from 'src/models/lesson/dto/lesson-response.dto';
import { UpdateLessonDto } from 'src/models/lesson/dto/update-lesson.dto';
export declare class LessonService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createLesson(unitId: string, createLessonDto: CreateLessonDto, userId: string): Promise<GetLessonResponseDto>;
    findOne(id: string): Promise<LessonResponseDto>;
    findOneAndCheck(unitId: string, lessonId: string): Promise<LessonResponseDto>;
    create(unitId: string, dto: CreateLessonDto, userId: string): Promise<LessonResponseDto>;
    update(unitId: string, lessonId: string, dto: UpdateLessonDto): Promise<LessonResponseDto>;
    delete(unitId: string, lessonId: string): Promise<LessonResponseDto>;
    lessonLearn(unitId: string, lessonId: string): Promise<LessonResponseDto>;
}
