import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TransactionClient } from 'src/common/decorators/transaction-client.decorator';
import { UseTransaction } from 'src/common/interceptor/transaction.interceptor';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CourseService } from 'src/models/course/course.service';
import { CourseResponseDto } from 'src/models/course/dto/course-response.dto';
import { CreateCourseResponseDto } from 'src/models/course/dto/create-course-response.dto';
import { CreateCourseDto } from 'src/models/course/dto/create-course.dto';
import { GetCourseUnitsResponseDto } from 'src/models/course/dto/get-course-units-response.dto';
import { GetCourseDto } from 'src/models/course/dto/get-course.dto';
import { GetCoursesRequestDto } from 'src/models/course/dto/get-courses-request.dto';
import { GetCoursesResponseDto } from 'src/models/course/dto/get-courses-response.dto';
import { JoinCourseRequestDto } from 'src/models/course/dto/join-course-request.dto';
import { JoinCourseResponseDto } from 'src/models/course/dto/join-course-response.dto';
import { RecommendCourseRequestDto } from 'src/models/course/dto/recommend-course-request.dto';
import { RecommendCourseResponseDto } from 'src/models/course/dto/recommend-course-response.dto';

@ApiTags('Courses')
@Controller('courses')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(CacheInterceptor)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @CacheTTL(300) // 5 minutes
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetCoursesResponseDto,
  })
  async getCourses(
    @Query() getCoursesRequestDto: GetCoursesRequestDto,
  ): Promise<GetCoursesResponseDto> {
    return this.courseService.getCourses(getCoursesRequestDto);
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CourseResponseDto,
  })
  async getCourseById(
    @Param('id') courseId: string,
    @Query() query: GetCourseDto,
  ): Promise<CourseResponseDto> {
    return this.courseService.getCourseById(courseId, query.spaceId);
  }

  @Post()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseTransaction()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateCourseResponseDto,
  })
  async createCourse(
    @CurrentUser() user: IAuthPayload,
    @TransactionClient() transaction: Prisma.TransactionClient,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<CreateCourseResponseDto> {
    return this.courseService.createCourse(createCourseDto);
  }

  @Patch(':id/join')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    type: JoinCourseResponseDto,
  })
  async joinCourse(
    @Param('id') courseId: string,
    @Body() joinCourseRequestDto: JoinCourseRequestDto,
  ): Promise<JoinCourseResponseDto> {
    return this.courseService.joinCourse(courseId, joinCourseRequestDto);
  }

  @Get(':id/units')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetCourseUnitsResponseDto,
  })
  async getCourseUnits(
    @Param('id') courseId: string,
  ): Promise<GetCourseUnitsResponseDto> {
    return this.courseService.getCourseUnits(courseId);
  }

  @Post('recommend')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    type: RecommendCourseResponseDto,
  })
  async recommendCourses(
    @Body() recommendCourseRequestDto: RecommendCourseRequestDto,
  ): Promise<RecommendCourseResponseDto> {
    return this.courseService.recommendCourses(recommendCourseRequestDto);
  }
}
