import { ApiProperty } from '@nestjs/swagger';

import { Language, SpaceTarget } from '@prisma/client';

import { Essay } from '../../essay/entities/essay.entity';
import { Note } from '../../note/entities/note.entity';
import { SpaceCourse } from '../../space-course/entities/space-course.entity';
import { User } from '../../user/entities/user.entity';
import { Vocabulary } from '../../vocabulary/entities/vocabulary.entity';

export class Space {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    enum: SpaceTarget,
  })
  target: SpaceTarget;
  @ApiProperty({
    enum: Language,
  })
  language: Language;
  @ApiProperty({
    type: 'string',
  })
  createdBy: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  creator?: User;
  @ApiProperty({
    type: () => Essay,
    isArray: true,
    required: false,
  })
  essays?: Essay[];
  @ApiProperty({
    type: () => Vocabulary,
    isArray: true,
    required: false,
  })
  vocabularies?: Vocabulary[];
  @ApiProperty({
    type: () => Note,
    isArray: true,
    required: false,
  })
  notes?: Note[];
  @ApiProperty({
    type: () => SpaceCourse,
    isArray: true,
    required: false,
  })
  courses?: SpaceCourse[];
}
