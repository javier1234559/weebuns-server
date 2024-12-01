import { ContentStatus, Prisma } from '@prisma/client';
import { CourseProgress } from '../../course-progress/entities/course-progress.entity';
import { LessonComment } from '../../lesson-comment/entities/lesson-comment.entity';
import { Note } from '../../note/entities/note.entity';
import { Unit } from '../../unit/entities/unit.entity';
import { User } from '../../user/entities/user.entity';
export declare class Lesson {
    id: string;
    unitId: string;
    title: string;
    summary: string | null;
    content: Prisma.JsonValue;
    orderIndex: number;
    isPremium: boolean;
    isRequired: boolean;
    status: ContentStatus;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    lessonWeight: number;
    unit?: Unit;
    creator?: User;
    notes?: Note[];
    comments?: LessonComment[];
    currentInProgress?: CourseProgress[];
    nextInProgress?: CourseProgress[];
}