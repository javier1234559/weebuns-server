import { ContentStatus } from '@prisma/client';
export declare class CourseDto {
    id: string;
    title: string;
    description: string | null;
    thumbnailUrl: string | null;
    language: string;
    minLevel: string;
    maxLevel: string;
    topics: string[];
    courseType: string;
    isPremium: boolean;
    totalWeight: number | null;
    status: ContentStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
