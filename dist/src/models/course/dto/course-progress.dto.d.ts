import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';
export declare class CourseProgressResponseDto {
    courseProgress: CourseProgress;
}
export declare class UpdateCourseProgressDto {
    currentUnitId?: string;
    currentLessonId?: string;
    nextUnitId?: string;
    nextLessonId?: string;
    completedWeight?: number;
    completedUnits?: string[];
    completedLessons?: string[];
}
