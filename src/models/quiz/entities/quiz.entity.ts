
import {User} from '../../user/entities/user.entity'
import {QuizQuestion} from '../../quiz-question/entities/quiz-question.entity'


export class Quiz {
  id: number ;
user_id: number ;
title: string ;
created_at: Date ;
user?: User ;
questions?: QuizQuestion[] ;
}
