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
exports.ActivityStreakResponseDto = exports.ActivityDataDto = exports.GetActivityStreakDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetActivityStreakDto {
}
exports.GetActivityStreakDto = GetActivityStreakDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-01',
        required: false,
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetActivityStreakDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-31',
        required: false,
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetActivityStreakDto.prototype, "endDate", void 0);
class ActivityDataDto {
}
exports.ActivityDataDto = ActivityDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
    }),
    __metadata("design:type", Number)
], ActivityDataDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            streak: 5,
        },
    }),
    __metadata("design:type", Object)
], ActivityDataDto.prototype, "data", void 0);
class ActivityStreakResponseDto {
}
exports.ActivityStreakResponseDto = ActivityStreakResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                '2024-03-15': {
                    level: 2,
                    data: {
                        streak: 5,
                    },
                },
            },
        ],
        isArray: true,
        type: 'array',
    }),
    __metadata("design:type", Array)
], ActivityStreakResponseDto.prototype, "activities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            level: 2,
            data: {
                streak: 5,
            },
        },
    }),
    __metadata("design:type", ActivityDataDto)
], ActivityStreakResponseDto.prototype, "currentStreak", void 0);
//# sourceMappingURL=activity-streak.dto.js.map