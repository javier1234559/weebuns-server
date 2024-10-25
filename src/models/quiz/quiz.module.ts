import { Module } from '@nestjs/common';

import { QuizService } from 'src/models/quiz/quiz.service';
import { QuizController } from 'src/models/quiz/restful/quiz.controller';

@Module({
  providers: [QuizService],
  exports: [QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
