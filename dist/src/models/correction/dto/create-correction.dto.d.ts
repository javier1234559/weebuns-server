import { CreateCorrectionSentenceDto } from '../../correction-sentence/dto/create-correction-sentence.dto';
export declare class CreateCorrectionDto {
    essay_id: string;
    overall_comment?: string;
    rating?: number;
    sentences: CreateCorrectionSentenceDto[];
}
