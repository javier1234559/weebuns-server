export declare class CreateVocabularyDto {
    term: string;
    meaning: string[];
    exampleSentence?: string | null;
    imageUrl?: string | null;
    referenceLink?: string | null;
    referenceName?: string | null;
    nextReview?: Date | null;
    deletedAt?: Date | null;
}
