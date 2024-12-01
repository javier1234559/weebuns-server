import { PrismaService } from 'src/common/prisma/prisma.service';
import { CheckJoinedCourseResponseDto } from 'src/models/course/dto/check-join-course.dto';
import { CourseLearnResponseDto } from 'src/models/course/dto/course-learn-response.dto';
import { CourseProgressResponseDto, UpdateCourseProgressDto } from 'src/models/course/dto/course-progress.dto';
import { CourseResponseDto } from 'src/models/course/dto/course-response.dto';
import { CreateCourseDto } from 'src/models/course/dto/create-course.dto';
import { CourseListResponseDto, CourseUnitResponseDto, GetCourseUnitsRequestDto } from 'src/models/course/dto/get-course-units.dto';
import { GetCoursesRequestDto } from 'src/models/course/dto/get-courses.dto';
import { JoinCourseResponseDto } from 'src/models/course/dto/join-course-response.dto';
import { UpdateCourseDto } from 'src/models/course/dto/update-course.dto';
export declare class CourseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCourseDto: CreateCourseDto, userId: string): Promise<CourseResponseDto>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseResponseDto>;
    delete(id: string): Promise<CourseResponseDto>;
    getAll(query: GetCoursesRequestDto): Promise<CourseListResponseDto>;
    getById(id: string): Promise<CourseResponseDto>;
    getCourseUnits(courseId: string, query: GetCourseUnitsRequestDto): Promise<CourseUnitResponseDto>;
    joinCourse(userId: string, courseId: string, spaceId: string): Promise<JoinCourseResponseDto>;
    getLearnCourse(courseId: string): Promise<CourseLearnResponseDto>;
    checkJoinedCourse(courseId: string, spaceId: string): Promise<CheckJoinedCourseResponseDto>;
    getCourseProgress(courseId: string, userId: string): Promise<CourseProgressResponseDto>;
    updateCourseProgress(courseId: string, userId: string, updateProgressDto: UpdateCourseProgressDto): Promise<CourseProgressResponseDto>;
}
