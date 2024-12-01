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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOneVocabularyResponseDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const vocabulary_entity_1 = require("../entities/vocabulary.entity");
let FindOneVocabularyResponseDto = class FindOneVocabularyResponseDto {
};
exports.FindOneVocabularyResponseDto = FindOneVocabularyResponseDto;
__decorate([
    (0, graphql_1.Field)(() => vocabulary_entity_1.Vocabulary),
    (0, swagger_1.ApiProperty)({ type: vocabulary_entity_1.Vocabulary }),
    __metadata("design:type", vocabulary_entity_1.Vocabulary)
], FindOneVocabularyResponseDto.prototype, "vocabulary", void 0);
exports.FindOneVocabularyResponseDto = FindOneVocabularyResponseDto = __decorate([
    (0, graphql_1.ObjectType)()
], FindOneVocabularyResponseDto);
//# sourceMappingURL=find-one-vocabulary-response.dto.js.map