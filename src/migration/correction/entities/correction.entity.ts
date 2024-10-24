
import {Essay} from '../../essay/entities/essay.entity'
import {User} from '../../user/entities/user.entity'
import {CorrectionSentence} from '../../correction-sentence/entities/correction-sentence.entity'
import {CorrectionReply} from '../../correction-reply/entities/correction-reply.entity'


export class Correction {
  id: string ;
essay_id: string ;
overall_comment: string  | null;
rating: number  | null;
created_by: string ;
created_at: Date ;
updated_at: Date ;
essay?: Essay ;
creator?: User ;
sentences?: CorrectionSentence[] ;
replies?: CorrectionReply[] ;
}
