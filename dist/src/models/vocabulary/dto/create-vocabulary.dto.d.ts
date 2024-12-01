export declare class CreateVocabularyDto {
    spaceId: string;
    term: string;
    meaning: string[];
    exampleSentence?: string | null;
    imageUrl?: string | null;
    referenceLink?: string | null;
    referenceName?: string | null;
    nextReview?: Date | null;
    tags: string[];
    repetitionLevel?: number;
}
