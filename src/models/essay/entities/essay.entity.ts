import { $Enums } from '@prisma/client';

import { IEssay } from 'src/models/essay/essay.interface';

export class Essay implements IEssay {
  id: number;
  id_space: number;
  title: string;
  summary: string;
  content: string;
  cover_url: string;
  status: $Enums.EssayStatus;
  language: string;
  created_by: number;
  created_at: Date;
  updated_at: Date;
}
