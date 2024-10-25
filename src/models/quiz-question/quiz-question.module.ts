import { Module } from '@nestjs/common';

import { QuizQuestionService } from 'src/models/quiz-question/quiz-question.service';
import { QuizQuestionController } from 'src/models/quiz-question/restful/quiz-question.controller';

@Module({
  providers: [QuizQuestionService],
  exports: [QuizQuestionService],
  controllers: [QuizQuestionController],
})
export class QuizQuestionModule {}
