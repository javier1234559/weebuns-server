
import {User} from '../../user/entities/user.entity'
import {ClassMember} from '../../classMember/entities/classMember.entity'


export class Class {
  id: number ;
name: string ;
description: string  | null;
created_by: number ;
creator?: User ;
is_trial: boolean ;
created_at: Date ;
updated_at: Date ;
members?: ClassMember[] ;
}
