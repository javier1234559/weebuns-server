import { Correction } from '../../correction/entities/correction.entity';
export declare class CorrectionSentence {
    id: string;
    correctionId: string;
    index: number;
    originalText: string;
    correctedText: string | null;
    explanation: string | null;
    isCorrect: boolean;
    rating: number | null;
    createdAt: Date;
    updatedAt: Date;
    correction?: Correction;
}
