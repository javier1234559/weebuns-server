import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CourseService } from 'src/models/course/course.service';
import { CheckJoinedCourseResponseDto } from 'src/models/course/dto/check-join-course.dto';
import { CourseLearnResponseDto } from 'src/models/course/dto/course-learn-response.dto';
import { CourseProgressResponseDto, UpdateCourseProgressDto } from 'src/models/course/dto/course-progress.dto';
import { CourseResponseDto } from 'src/models/course/dto/course-response.dto';
import { CreateCourseDto } from 'src/models/course/dto/create-course.dto';
import { CourseListResponseDto, CourseUnitResponseDto, GetCourseUnitsRequestDto } from 'src/models/course/dto/get-course-units.dto';
import { GetCoursesRequestDto } from 'src/models/course/dto/get-courses.dto';
import { JoinCourseRequestDto } from 'src/models/course/dto/join-course-request.dto';
import { JoinCourseResponseDto } from 'src/models/course/dto/join-course-response.dto';
import { UpdateCourseDto } from 'src/models/course/dto/update-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(user: IAuthPayload, createCourseDto: CreateCourseDto): Promise<CourseResponseDto>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseResponseDto>;
    delete(id: string): Promise<CourseResponseDto>;
    getCourses(query: GetCoursesRequestDto): Promise<CourseListResponseDto>;
    getCourseById(id: string): Promise<CourseResponseDto>;
    getCourseUnits(courseId: string, query: GetCourseUnitsRequestDto): Promise<CourseUnitResponseDto>;
    joinCourse(courseId: string, user: IAuthPayload, joinCourseRequestDto: JoinCourseRequestDto): Promise<JoinCourseResponseDto>;
    learnCourse(courseId: string): Promise<CourseLearnResponseDto>;
    checkJoin(courseId: string, spaceId: string): Promise<CheckJoinedCourseResponseDto>;
    getCourseProgress(courseId: string, user: IAuthPayload): Promise<CourseProgressResponseDto>;
    updateCourseProgress(courseId: string, user: IAuthPayload, updateProgressDto: UpdateCourseProgressDto): Promise<CourseProgressResponseDto>;
}
