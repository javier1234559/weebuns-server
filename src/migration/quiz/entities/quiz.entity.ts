
import {Space} from '../../space/entities/space.entity'
import {User} from '../../user/entities/user.entity'
import {QuizQuestion} from '../../quiz-question/entities/quiz-question.entity'


export class Quiz {
  id: string ;
id_space: string ;
title: string ;
created_by: string ;
created_at: Date ;
updated_at: Date ;
space?: Space ;
creator?: User ;
questions?: QuizQuestion[] ;
}
