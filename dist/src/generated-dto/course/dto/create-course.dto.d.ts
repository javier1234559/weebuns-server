export declare class CreateCourseDto {
    title: string;
    description?: string | null;
    thumbnailUrl?: string | null;
    language: string;
    minLevel: string;
    maxLevel: string;
    topics: string[];
    courseType: string;
    totalWeight?: number | null;
    deletedAt?: Date | null;
}
