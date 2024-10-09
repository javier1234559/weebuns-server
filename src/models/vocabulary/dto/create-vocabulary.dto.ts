





export class CreateVocabularyDto {
  image?: string;
word: string;
definition: string;
pronunciation: string;
example: string;
part_of_speech: string;
mastery_level: string;
is_need_review: boolean;
next_review_date?: Date;
ease_factor: number;
interval: number;
}
