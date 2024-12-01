import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';
export declare class CheckJoinedCourseResponseDto {
    check: boolean;
    progress?: CourseProgress | null;
}
