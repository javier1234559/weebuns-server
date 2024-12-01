export declare class VocabularyDto {
    id: string;
    term: string;
    meaning: string[];
    exampleSentence: string | null;
    imageUrl: string | null;
    referenceLink: string | null;
    referenceName: string | null;
    tags: string[];
    repetitionLevel: number;
    nextReview: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
