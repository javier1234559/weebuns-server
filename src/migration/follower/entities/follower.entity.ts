
import {User} from '../../user/entities/user.entity'


export class Follower {
  id: string ;
id_follower: string ;
id_following: string ;
followed_at: Date ;
follower?: User ;
following?: User ;
}
