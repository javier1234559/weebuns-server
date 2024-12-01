export declare class CorrectionSentenceDto {
    id: string;
    index: number;
    originalText: string;
    correctedText: string | null;
    explanation: string | null;
    isCorrect: boolean;
    rating: number | null;
    createdAt: Date;
    updatedAt: Date;
}
