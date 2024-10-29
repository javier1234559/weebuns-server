import { Essay as PrismaEssay } from '@prisma/client';

import { EssayHashtag } from 'src/models/essay-hashtag/entities/essay-hashtag.entity';

export interface IEssay extends PrismaEssay {
  hashtags?: EssayHashtag[];

  _count?: {
    hashtags: number;
    corrections: number;
  };
}
