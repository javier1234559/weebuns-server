"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const groq_sdk_1 = __importDefault(require("groq-sdk"));
let AiService = class AiService {
    constructor(configService) {
        this.configService = configService;
        this.modelName = 'llama3-8b-8192';
        this.groq = new groq_sdk_1.default({
            apiKey: this.configService.get('AI_API_KEY'),
        });
    }
    async translate(dto) {
        try {
            const prompt = `${dto.text}\n\nTranslate from ${dto.sourceLanguage} to ${dto.targetLanguage}.`;
            const completion = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'Translate directly, no comments.',
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                model: this.modelName,
                temperature: 0.3,
            });
            console.log('------');
            console.log(prompt);
            console.log(JSON.stringify(completion, null, 2));
            return {
                original_text: dto.text,
                translated_text: completion.choices[0]?.message?.content?.trim(),
                source_language: dto.sourceLanguage,
                target_language: dto.targetLanguage,
            };
        }
        catch (error) {
            throw new common_1.NotFoundException(`Translation failed: ${error.message}`);
        }
    }
    async checkGrammar(dto) {
        try {
            const prompt = `Check this text and return ONLY JSON: ${dto.text}

Required format:
{
  "corrections": [
    {
      "original": "error text",
      "corrected": "fixed text",
      "explanation": "why",
      "type": "grammar|spelling|punctuation",
      "position": {"start":0, "end":0}
    }
  ],
  "summary": "brief summary",
  "overall_score": 100
}`;
            const completion = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a grammar checker. Always respond with valid JSON only.',
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                model: this.modelName,
                temperature: 0.1,
            });
            console.log('------');
            console.log(prompt);
            console.log(JSON.stringify(completion, null, 2));
            const response = completion.choices[0]?.message?.content;
            return JSON.parse(response || '{}');
        }
        catch (error) {
            throw new common_1.NotFoundException(`Grammar check failed: ${error.message}`);
        }
    }
    async recommendTopics(dto) {
        try {
            const prompt = `Only ${dto.count || 5} writing prompts`;
            const completion = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'Return JSON array only: ["prompt1"]',
                    },
                    {
                        role: 'user',
                        content: '3 writing prompts',
                    },
                    {
                        role: 'assistant',
                        content: '["Tell me about your best day", "Write about a dream", "Describe your favorite place"]',
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                model: this.modelName,
                temperature: 0.8,
            });
            console.log('------');
            console.log(prompt);
            console.log(JSON.stringify(completion, null, 2));
            const topics = JSON.parse(completion.choices[0]?.message?.content || '[]');
            return {
                topics,
                category: dto.category || 'general',
                count: topics.length,
            };
        }
        catch (error) {
            throw new common_1.NotFoundException(`Topic recommendation failed: ${error.message}`);
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AiService);
//# sourceMappingURL=ai.service.js.map