export class CreateVocabularyDto {
  image_url?: string;
  word: string;
  part_of_speech?: string;
  definition?: string;
  pronunciation?: string;
  example?: string;
  reference_link?: string;
  id_essay_link?: string;
  mastery_level?: string;
  is_need_review?: boolean;
  next_review_date?: string;
  ease_factor?: number;
  interval?: number;

  created_id: string;
  space_id: string;
}
