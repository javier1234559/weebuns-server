import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';
import { User } from 'src/models/user/entities/user.entity';
export declare class CourseWithJoinStatus {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    language: string;
    minLevel: string;
    maxLevel: string;
    topics: string[];
    courseType: string;
    isPremium: boolean;
    totalWeight: number;
    isPublished: boolean;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    isJoined: boolean;
    joinedAt: Date | null;
    progress: CourseProgress | null;
    creator: User;
}
export declare class SpaceCoursesAllResponseDto {
    data: CourseWithJoinStatus[];
    pagination: PaginationOutputDto;
}
