import { IVocabulary } from 'src/models/vocabulary/vocabulary.interface';

export class Vocabulary implements IVocabulary {
  id: string;
  image_url: string;
  word: string;
  part_of_speech: string;
  definition: string;
  pronunciation: string;
  example: string;
  reference_link: string;
  id_essay_link: string;
  id_space: string;
  mastery_level: string;
  is_need_review: boolean;
  next_review_date: string;
  ease_factor: number;
  interval: number;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}
