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
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let LessonService = class LessonService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLesson(unitId, createLessonDto, userId) {
        const lesson = await this.prisma.lesson.create({
            data: {
                unitId,
                title: createLessonDto.title,
                summary: createLessonDto.summary,
                content: createLessonDto.content,
                orderIndex: createLessonDto.orderIndex,
                isPremium: createLessonDto.isPremium ?? false,
                isRequired: createLessonDto.isRequired ?? true,
                lessonWeight: createLessonDto.lessonWeight ?? 0,
                status: client_1.ContentStatus.draft,
                createdBy: userId,
            },
        });
        return {
            lesson,
        };
    }
    async findOne(id) {
        const lesson = await this.prisma.lesson.findFirst({
            where: {
                id,
            },
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson ${id} not found`);
        }
        return { lesson };
    }
    async findOneAndCheck(unitId, lessonId) {
        const lesson = await this.prisma.lesson.findFirst({
            where: {
                id: lessonId,
                unitId,
            },
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson ${lessonId} not found in unit ${unitId}`);
        }
        return { lesson };
    }
    async create(unitId, dto, userId) {
        const unit = await this.prisma.unit.findUnique({ where: { id: unitId } });
        if (!unit)
            throw new common_1.NotFoundException(`Unit ${unitId} not found`);
        const lesson = await this.prisma.lesson.create({
            data: {
                ...dto,
                unitId,
                createdBy: userId,
                status: dto.status ?? client_1.ContentStatus.draft,
                isPremium: dto.isPremium ?? false,
                isRequired: dto.isRequired ?? true,
                lessonWeight: dto.lessonWeight ?? 0,
            },
        });
        return { lesson };
    }
    async update(unitId, lessonId, dto) {
        const lesson = await this.prisma.lesson.findFirst({
            where: {
                id: lessonId,
                unitId,
            },
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson ${lessonId} not found in unit ${unitId}`);
        }
        const updated = await this.prisma.lesson.update({
            where: { id: lessonId },
            data: dto,
        });
        return { lesson: updated };
    }
    async delete(unitId, lessonId) {
        const lesson = await this.prisma.lesson.findFirst({
            where: {
                id: lessonId,
                unitId,
            },
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson ${lessonId} not found in unit ${unitId}`);
        }
        const deleted = await this.prisma.lesson.delete({
            where: { id: lessonId },
        });
        return { lesson: deleted };
    }
    async lessonLearn(unitId, lessonId) {
        const lesson = await this.prisma.lesson.findFirst({
            where: {
                id: lessonId,
                unitId,
            },
            include: {
                creator: true,
            },
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson ${lessonId} not found in unit ${unitId}`);
        }
        return { lesson };
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonService);
//# sourceMappingURL=lesson.service.js.map