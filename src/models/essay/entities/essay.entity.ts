import { $Enums } from '@prisma/client';

import { Correction } from 'src/models/correction/entities/correction.entity';
import { EssayHashtag } from 'src/models/essay-hashtag/entities/essay-hashtag.entity';
import { IEssay } from 'src/models/essay/essay.interface';

import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';

export class Essay implements IEssay {
  id: number;
  id_space: number;
  title: string;
  summary: string | null;
  content: string;
  cover_url: string | null;
  status: $Enums.EssayStatus;
  language: string;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  space?: Space;
  author?: User;
  hashtags?: EssayHashtag[];
  corrections?: Correction[];
}
