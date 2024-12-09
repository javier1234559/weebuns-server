import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { RolesGuard } from 'src/common/auth/role.guard';
import { Roles, UserRole } from 'src/common/decorators/role.decorator';
import { LessonResponseDto } from 'src/models/lesson/dto/lesson-response.dto';
import { LessonService } from 'src/models/lesson/lesson.service';

@ApiTags('lessons')
@Controller('lessons')
@UseGuards(AuthGuard, RolesGuard)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK, type: LessonResponseDto })
  async getLesson(@Param('id') id: string): Promise<LessonResponseDto> {
    return this.lessonService.findOne(id);
  }
}
