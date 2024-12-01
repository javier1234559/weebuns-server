import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Course } from 'src/models/course/entities/course.entity';
import { CourseProgress } from '../../course-progress/entities/course-progress.entity';
declare const CourseJoinedDto_base: import("@nestjs/common").Type<Omit<Course, "progress">>;
export declare class CourseJoinedDto extends CourseJoinedDto_base {
    progress?: CourseProgress | null;
}
export declare class SpaceCoursesJoinedResponseDto {
    data: CourseJoinedDto[];
    pagination: PaginationOutputDto;
}
export {};
