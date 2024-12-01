import { AiService } from './ai.service';
import { CheckGrammarResponseDto } from './dto/check-grammar-response.dto';
import { CheckGrammarDto } from './dto/check-grammar.dto';
import { RecommendTopicsResponseDto } from './dto/recommend-topics-response.dto';
import { RecommendTopicsDto } from './dto/recommend-topics.dto';
import { TranslateResponseDto } from './dto/translate-response.dto';
import { TranslateDto } from './dto/translate.dto';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    translate(dto: TranslateDto): Promise<TranslateResponseDto>;
    checkGrammar(dto: CheckGrammarDto): Promise<CheckGrammarResponseDto>;
    recommendTopics(dto: RecommendTopicsDto): Promise<RecommendTopicsResponseDto>;
}
