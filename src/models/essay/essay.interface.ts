import { Essay as PrismaEssay } from '@prisma/client';

import { Hashtag } from 'src/models/hashtag/entities/hashtag.entity';

export interface IEssay extends PrismaEssay {
  hashtags?: {
    hashtag: Hashtag;
  }[];

  _count?: {
    hashtags: number;
    corrections: number;
  };
}
