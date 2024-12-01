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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../common/auth/auth.guard");
const role_guard_1 = require("../../common/auth/role.guard");
const cache_key_decorator_1 = require("../../common/decorators/cache-key.decorator");
const ai_service_1 = require("./ai.service");
const check_grammar_response_dto_1 = require("./dto/check-grammar-response.dto");
const check_grammar_dto_1 = require("./dto/check-grammar.dto");
const recommend_topics_response_dto_1 = require("./dto/recommend-topics-response.dto");
const recommend_topics_dto_1 = require("./dto/recommend-topics.dto");
const translate_response_dto_1 = require("./dto/translate-response.dto");
const translate_dto_1 = require("./dto/translate.dto");
let AiController = class AiController {
    constructor(aiService) {
        this.aiService = aiService;
    }
    async translate(dto) {
        return this.aiService.translate(dto);
    }
    async checkGrammar(dto) {
        return this.aiService.checkGrammar(dto);
    }
    async recommendTopics(dto) {
        return this.aiService.recommendTopics(dto);
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)('translate'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiBody)({ type: translate_dto_1.TranslateDto }),
    (0, cache_key_decorator_1.CacheKeyDto)('translate', 86400),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: translate_response_dto_1.TranslateResponseDto,
        description: 'Translation successful',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [translate_dto_1.TranslateDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "translate", null);
__decorate([
    (0, common_1.Post)('check-grammar'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiBody)({ type: check_grammar_dto_1.CheckGrammarDto }),
    (0, cache_key_decorator_1.CacheKeyDto)('grammar', 86400),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: check_grammar_response_dto_1.CheckGrammarResponseDto,
        description: 'Grammar check successful',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_grammar_dto_1.CheckGrammarDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "checkGrammar", null);
__decorate([
    (0, common_1.Get)('recommend-topics'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: recommend_topics_response_dto_1.RecommendTopicsResponseDto,
        description: 'Topics recommended successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recommend_topics_dto_1.RecommendTopicsDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "recommendTopics", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)('ai'),
    (0, swagger_1.ApiTags)('ai'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __metadata("design:paramtypes", [ai_service_1.AiService])
], AiController);
//# sourceMappingURL=ai.controller.js.map