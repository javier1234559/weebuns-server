
import {ClassMemberRole} from '@prisma/client'
import {Class} from '../../class/entities/class.entity'
import {User} from '../../user/entities/user.entity'


export class ClassMember {
  id: number ;
class_id: number ;
class?: Class ;
user_id: number ;
user?: User ;
role: ClassMemberRole ;
joined_at: Date ;
}
