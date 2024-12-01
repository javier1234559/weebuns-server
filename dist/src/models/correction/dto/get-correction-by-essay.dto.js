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
exports.GetCorrectionsByEssayDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
let GetCorrectionsByEssayDto = class GetCorrectionsByEssayDto extends pagination_dto_1.PaginationInputDto {
};
exports.GetCorrectionsByEssayDto = GetCorrectionsByEssayDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetCorrectionsByEssayDto.prototype, "essayId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetCorrectionsByEssayDto.prototype, "search", void 0);
exports.GetCorrectionsByEssayDto = GetCorrectionsByEssayDto = __decorate([
    (0, graphql_1.InputType)()
], GetCorrectionsByEssayDto);
//# sourceMappingURL=get-correction-by-essay.dto.js.map