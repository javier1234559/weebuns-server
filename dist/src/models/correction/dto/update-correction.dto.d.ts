import { UpdateCorrectionSentenceDto } from 'src/models/correction-sentence/dto/update-correction-sentence.dto';
export declare class UpdateCorrectionDto {
    id: string;
    overall_comment?: string;
    rating?: number;
    sentences?: UpdateCorrectionSentenceDto[];
}
