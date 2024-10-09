
import {EssayStatus} from '@prisma/client'
import {Space} from '../../space/entities/space.entity'
import {User} from '../../user/entities/user.entity'


export class Essay {
  id: number ;
space_id: number ;
title: string ;
summary: string  | null;
content: string  | null;
thumbnail: string  | null;
status: EssayStatus ;
created_by: number ;
created_at: Date ;
updated_at: Date ;
space?: Space ;
user?: User ;
}
