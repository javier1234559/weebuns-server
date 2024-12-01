import { ICorrectionSentence } from 'src/models/correction-sentence/correction-sentence.interfacte';
export declare class CorrectionSentence implements ICorrectionSentence {
    id: string;
    correctionId: string;
    index: number;
    originalText: string;
    correctedText: string;
    explanation: string;
    isCorrect: boolean;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}
