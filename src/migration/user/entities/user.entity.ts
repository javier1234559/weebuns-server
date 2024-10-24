
import {UserRole,AuthProvider} from '@prisma/client'
import {UserLanguage} from '../../user-language/entities/user-language.entity'
import {Follower} from '../../follower/entities/follower.entity'
import {Space} from '../../space/entities/space.entity'
import {Essay} from '../../essay/entities/essay.entity'
import {Quiz} from '../../quiz/entities/quiz.entity'
import {Vocabulary} from '../../vocabulary/entities/vocabulary.entity'
import {FlashCard} from '../../flash-card/entities/flash-card.entity'
import {Correction} from '../../correction/entities/correction.entity'
import {CorrectionReply} from '../../correction-reply/entities/correction-reply.entity'


export class User {
  id: string ;
username: string  | null;
email: string ;
password_hash: string  | null;
role: UserRole ;
auth_provider: AuthProvider ;
auth_provider_id: string  | null;
first_name: string  | null;
last_name: string  | null;
profile_picture: string  | null;
is_email_verified: boolean ;
last_login: Date  | null;
created_at: Date ;
updated_at: Date ;
languages?: UserLanguage[] ;
followedBy?: Follower[] ;
following?: Follower[] ;
spaces?: Space[] ;
essays?: Essay[] ;
quizzes?: Quiz[] ;
vocabularies?: Vocabulary[] ;
flash_cards?: FlashCard[] ;
corrections?: Correction[] ;
correction_replies?: CorrectionReply[] ;
}
