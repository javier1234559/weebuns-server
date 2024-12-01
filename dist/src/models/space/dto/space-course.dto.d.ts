import { Decimal } from '@prisma/client/runtime/library';
import { CourseCreatorDto } from 'src/models/course/dto/course-creator.dto';
export declare class SpaceCourseDto {
    id: string;
    title: string;
    description: string | null;
    thumbnailUrl: string | null;
    level: string;
    price: Decimal | null;
    totalWeight: number;
    isPublished: boolean;
    createdAt: Date;
    creator: CourseCreatorDto;
    is_joined: boolean;
    joined_at: Date | null;
}
