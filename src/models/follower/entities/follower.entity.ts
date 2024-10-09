
import {User} from '../../user/entities/user.entity'


export class Follower {
  id: number ;
id_follower: number ;
id_following: number ;
followed_at: Date ;
follower?: User ;
following?: User ;
}
