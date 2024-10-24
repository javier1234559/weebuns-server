
import {Correction} from '../../correction/entities/correction.entity'
import {User} from '../../user/entities/user.entity'


export class CorrectionReply {
  id: string ;
correction_id: string ;
comment: string ;
created_by: string ;
created_at: Date ;
updated_at: Date ;
correction?: Correction ;
creator?: User ;
}
