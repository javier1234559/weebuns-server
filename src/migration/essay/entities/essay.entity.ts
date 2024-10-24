
import {EssayStatus} from '@prisma/client'
import {Space} from '../../space/entities/space.entity'
import {User} from '../../user/entities/user.entity'
import {EssayHashtag} from '../../essay-hashtag/entities/essay-hashtag.entity'
import {Correction} from '../../correction/entities/correction.entity'


export class Essay {
  id: string ;
id_space: string ;
title: string ;
summary: string  | null;
content: string ;
cover_url: string  | null;
status: EssayStatus ;
language: string ;
created_by: string ;
created_at: Date ;
updated_at: Date ;
space?: Space ;
author?: User ;
hashtags?: EssayHashtag[] ;
corrections?: Correction[] ;
}
