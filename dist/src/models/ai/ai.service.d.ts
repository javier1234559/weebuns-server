import { ConfigService } from '@nestjs/config';
import { CheckGrammarResponseDto } from './dto/check-grammar-response.dto';
import { CheckGrammarDto } from './dto/check-grammar.dto';
import { RecommendTopicsResponseDto } from './dto/recommend-topics-response.dto';
import { RecommendTopicsDto } from './dto/recommend-topics.dto';
import { TranslateResponseDto } from './dto/translate-response.dto';
import { TranslateDto } from './dto/translate.dto';
export declare class AiService {
    private configService;
    private groq;
    private readonly modelName;
    constructor(configService: ConfigService);
    translate(dto: TranslateDto): Promise<TranslateResponseDto>;
    checkGrammar(dto: CheckGrammarDto): Promise<CheckGrammarResponseDto>;
    recommendTopics(dto: RecommendTopicsDto): Promise<RecommendTopicsResponseDto>;
}
