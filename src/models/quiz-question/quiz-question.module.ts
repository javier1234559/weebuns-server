import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { QuizQuestionService } from 'src/models/quiz-question/quiz-question.service';
import { QuizQuestionController } from 'src/models/quiz-question/restful/quiz-question.controller';

@Module({
  imports: [PrismaModule],
  providers: [QuizQuestionService],
  exports: [QuizQuestionService],
  controllers: [QuizQuestionController],
})
export class QuizQuestionModule {}
