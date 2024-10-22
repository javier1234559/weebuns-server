
import {Essay} from '../../essay/entities/essay.entity'
import {User} from '../../user/entities/user.entity'
import {CorrectionSentence} from '../../correction-sentence/entities/correction-sentence.entity'
import {CorrectionReply} from '../../correction-reply/entities/correction-reply.entity'


export class Correction {
  id: number ;
essay_id: number ;
overall_comment: string  | null;
rating: number  | null;
created_by: number ;
created_at: Date ;
updated_at: Date ;
essay?: Essay ;
creator?: User ;
sentences?: CorrectionSentence[] ;
replies?: CorrectionReply[] ;
}
