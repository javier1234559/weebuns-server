import { ContentStatus } from '@prisma/client';
export declare class LessonLearnDto {
    id: string;
    title: string;
    orderIndex: number;
    isPremium: boolean;
    isRequired: boolean;
    status: ContentStatus;
    lessonWeight: number;
}
export declare class UnitLearnDto {
    id: string;
    title: string;
    orderIndex: number;
    isPremium: boolean;
    lessons: LessonLearnDto[];
}
export declare class CourseLearnDto {
    id: string;
    title: string;
    description?: string;
    thumbnailUrl?: string;
    language: string;
    minLevel: string;
    maxLevel: string;
    topics: string[];
    courseType: string;
    isPremium: boolean;
    totalWeight: number;
    status: ContentStatus;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    units: UnitLearnDto[];
}
export declare class CourseLearnResponseDto {
    course: CourseLearnDto;
}
