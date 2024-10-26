import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { QuizService } from 'src/models/quiz/quiz.service';
import { QuizController } from 'src/models/quiz/restful/quiz.controller';

@Module({
  imports: [PrismaModule],
  providers: [QuizService],
  exports: [QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
