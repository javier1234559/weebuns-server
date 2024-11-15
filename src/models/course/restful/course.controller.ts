import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CourseService } from 'src/models/course/course.service';
import { CourseResponseDto } from 'src/models/course/dto/course-response.dto';
import { GetCourseDto } from 'src/models/course/dto/get-course.dto';

@ApiTags('Courses')
@Controller('courses')
@UseGuards(AuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({
    status: 200,
    type: CourseResponseDto,
  })
  async getCourseById(
    @Param('id') courseId: string,
    @Query() query: GetCourseDto,
  ): Promise<CourseResponseDto> {
    return this.courseService.getCourseById(courseId, query.spaceId);
  }
}
