import { ContentStatus } from '@prisma/client';
export declare class ExploreCoursesQueryDto {
    page?: number;
    perPage?: number;
    search?: string;
    language?: string;
    minLevel?: string;
    maxLevel?: string;
    topics?: string[];
    courseType?: string;
    status?: ContentStatus;
}
