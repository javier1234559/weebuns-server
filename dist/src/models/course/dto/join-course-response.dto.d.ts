import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';
export declare class JoinCourseResponseDto {
    message: string;
    joinedAt: Date;
    progress: CourseProgress;
}
