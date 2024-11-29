import { PartialType } from '@nestjs/swagger';

import { CreateLessonDto } from '../dto/create-lesson.dto';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {}
