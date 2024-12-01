import { LessonWithoutContent } from 'src/models/lesson/dto/lesson-without-content.dto';
export declare class UnitWithLessonsDto {
    id: string;
    courseId: string;
    title: string;
    orderIndex: number;
    isPremium: boolean;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    lessons: LessonWithoutContent[];
}
export declare class BulkUpdateUnitsDto {
    courseId: string;
    units: UnitWithLessonsDto[];
}
export declare class BulkUpdateUnitsResponseDto {
    data: UnitWithLessonsDto[];
}
