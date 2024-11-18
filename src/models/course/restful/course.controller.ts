import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CourseService } from 'src/models/course/course.service';
import { CourseLearnResponseDto } from 'src/models/course/dto/course-learn-response.dto';
import {
  CourseProgressResponseDto,
  UpdateCourseProgressDto,
} from 'src/models/course/dto/course-progress.dto';
import { CourseResponseDto } from 'src/models/course/dto/course-response.dto';
import { CreateCourseDto } from 'src/models/course/dto/create-course.dto';
import {
  CourseListResponseDto,
  CourseUnitResponseDto,
  GetCourseUnitsRequestDto,
} from 'src/models/course/dto/get-course-units.dto';
import { GetCoursesRequestDto } from 'src/models/course/dto/get-courses.dto';
import { JoinCourseRequestDto } from 'src/models/course/dto/join-course-request.dto';
import { JoinCourseResponseDto } from 'src/models/course/dto/join-course-response.dto';
import { UpdateCourseDto } from 'src/models/course/dto/update-course.dto';

@ApiTags('Courses')
@Controller('courses')
@UseGuards(AuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CourseResponseDto,
  })
  async createCourse(
    @CurrentUser() user: IAuthPayload,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<CourseResponseDto> {
    const userId = String(user.sub);
    return this.courseService.create(createCourseDto, userId);
  }

  @Patch(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CourseResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CourseResponseDto,
  })
  async delete(@Param('id') id: string): Promise<CourseResponseDto> {
    return this.courseService.delete(id);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    type: CourseListResponseDto,
  })
  async getCourses(
    @Query() query: GetCoursesRequestDto,
  ): Promise<CourseListResponseDto> {
    return this.courseService.getAll(query);
  }

  @Get(':id')
  @Roles(UserRole.USER)
  @ApiResponse({
    status: HttpStatus.OK,
    type: CourseResponseDto,
  })
  async getCourseById(@Param('id') id: string): Promise<CourseResponseDto> {
    return this.courseService.getById(id);
  }

  @Get(':id/units')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    type: CourseUnitResponseDto,
  })
  async getCourseUnits(
    @Param('id') courseId: string,
    @Query() query: GetCourseUnitsRequestDto,
  ): Promise<CourseUnitResponseDto> {
    return this.courseService.getCourseUnits(courseId, query);
  }

  @Patch(':id/join')
  @Roles(UserRole.USER)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    type: JoinCourseResponseDto,
  })
  async joinCourse(
    @Param('id') courseId: string,
    @CurrentUser() user: IAuthPayload,
    @Body() joinCourseRequestDto: JoinCourseRequestDto,
  ): Promise<JoinCourseResponseDto> {
    const userId = String(user.sub);
    return this.courseService.joinCourse(
      userId,
      courseId,
      joinCourseRequestDto.spaceId,
    );
  }

  @Get(':id/learn')
  @Roles(UserRole.USER)
  @ApiResponse({
    status: HttpStatus.OK,
    type: CourseLearnResponseDto,
  })
  async learnCourse(
    @Param('id') courseId: string,
  ): Promise<CourseLearnResponseDto> {
    return this.courseService.getLearnCourse(courseId);
  }

  @Get(':id/progress')
  @Roles(UserRole.USER)
  @ApiResponse({
    status: HttpStatus.OK,
    type: CourseProgressResponseDto,
  })
  async getCourseProgress(
    @Param('id') courseId: string,
    @CurrentUser() user: IAuthPayload,
  ): Promise<CourseProgressResponseDto> {
    const userId = String(user.sub);
    return this.courseService.getCourseProgress(courseId, userId);
  }

  @Patch(':id/progress')
  @Roles(UserRole.USER)
  @ApiResponse({
    status: HttpStatus.OK,
    type: CourseProgressResponseDto,
  })
  async updateCourseProgress(
    @Param('id') courseId: string,
    @CurrentUser() user: IAuthPayload,
    @Body() updateProgressDto: UpdateCourseProgressDto,
  ): Promise<CourseProgressResponseDto> {
    const userId = String(user.sub);
    return this.courseService.updateCourseProgress(
      courseId,
      userId,
      updateProgressDto,
    );
  }
}
