
import {Correction} from '../../correction/entities/correction.entity'
import {User} from '../../user/entities/user.entity'


export class CorrectionReply {
  id: number ;
correction_id: number ;
comment: string ;
created_by: number ;
created_at: Date ;
updated_at: Date ;
correction?: Correction ;
creator?: User ;
}
