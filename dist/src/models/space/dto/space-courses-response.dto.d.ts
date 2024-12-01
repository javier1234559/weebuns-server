import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Course } from 'src/models/course/entities/course.entity';
export declare class SpaceCoursesResponseDto {
    data: Course[];
    pagination: PaginationOutputDto;
}
