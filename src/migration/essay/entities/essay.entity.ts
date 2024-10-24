import { EssayStatus } from '@prisma/client';

import { Correction } from '../../correction/entities/correction.entity';
import { EssayHashtag } from '../../essay-hashtag/entities/essay-hashtag.entity';
import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';

export class Essay {
  id: number;
  id_space: number;
  title: string;
  summary: string | null;
  content: string;
  cover_url: string | null;
  status: EssayStatus;
  language: string;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  space?: Space;
  author?: User;
  hashtags?: EssayHashtag[];
  corrections?: Correction[];
}