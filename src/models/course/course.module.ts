import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CourseService } from 'src/models/course/course.service';
import { CourseController } from 'src/models/course/restful/course.controller';

@Module({
  imports: [PrismaModule],
  providers: [CourseService],
  exports: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
