declare class PositionDto {
    start: number;
    end: number;
}
declare class CorrectionDto {
    original: string;
    corrected: string;
    explanation: string;
    type: 'grammar' | 'spelling' | 'punctuation' | 'style';
    position: PositionDto;
}
export declare class CheckGrammarResponseDto {
    corrections: CorrectionDto[];
    summary: string;
    overall_score: number;
}
export {};
