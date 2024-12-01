import { PaginationInputDto, PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Course } from 'src/models/course/entities/course.entity';
import { LessonWithoutContent } from 'src/models/lesson/dto/lesson-without-content.dto';
export declare class GetCourseUnitsRequestDto extends PaginationInputDto {
    search?: string;
}
export declare class CourseListResponseDto {
    data: Course[];
    pagination: PaginationOutputDto;
}
export declare class UnitWithLessonsDto {
    id: string;
    courseId: string;
    title: string;
    orderIndex: number;
    isPremium: boolean;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    lessons: LessonWithoutContent[];
}
export declare class CourseUnitResponseDto {
    data: UnitWithLessonsDto[];
    pagination: PaginationOutputDto;
}
