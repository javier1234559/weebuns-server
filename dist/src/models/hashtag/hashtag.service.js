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
exports.HashtagService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const logger_1 = require("../../common/utils/logger");
const pagination_1 = require("../../common/utils/pagination");
let HashtagService = class HashtagService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(findAllHashtagsDto) {
        const { page, perPage, search } = findAllHashtagsDto;
        const skip = (page - 1) * perPage || 0;
        let where = {};
        if (search) {
            where = {
                OR: [{ name: { contains: search, mode: 'insensitive' } }],
            };
        }
        const [hashtags, totalItems] = await Promise.all([
            this.prisma.hashtag.findMany({
                where,
                skip,
                take: perPage,
                orderBy: { createdAt: 'desc' },
                include: {
                    _count: {
                        select: { essays: true },
                    },
                },
            }),
            this.prisma.hashtag.count({ where }),
        ]);
        const pagination = (0, pagination_1.calculatePagination)(totalItems, findAllHashtagsDto);
        return {
            data: hashtags,
            pagination,
        };
    }
    async deleteByName(name) {
        const hashtag = await this.prisma.hashtag.findFirst({
            where: { name },
            include: {
                _count: {
                    select: {
                        essays: true,
                    },
                },
            },
        });
        logger_1.logger.info('Hashtag found:', hashtag);
        if (!hashtag) {
            throw new common_1.NotFoundException(`Hashtag with name ${name} not found`);
        }
        if (hashtag._count.essays > 0) {
            throw new common_1.ConflictException({
                message: 'Cannot delete hashtag that is in use',
                details: `Hashtag "${name}" is currently used in ${hashtag._count.essays} essays. Please remove all essay associations before deleting.`,
            });
        }
        await this.prisma.hashtag.delete({
            where: { id: hashtag.id },
        });
        return {
            hashtag,
        };
    }
    async findOrCreateHashtags(hashtagNames) {
        if (!hashtagNames?.length)
            return [];
        const uniqueNames = [
            ...new Set(hashtagNames.map((name) => name.toLowerCase())),
        ];
        const hashtagIds = await this.prisma.$transaction(async (tx) => {
            const results = await Promise.all(uniqueNames.map(async (name) => {
                let hashtag = await tx.hashtag.findFirst({
                    where: { name: { equals: name, mode: 'insensitive' } },
                });
                if (!hashtag) {
                    hashtag = await tx.hashtag.create({
                        data: { name },
                    });
                }
                return hashtag.id;
            }));
            return results;
        });
        return hashtagIds;
    }
};
exports.HashtagService = HashtagService;
exports.HashtagService = HashtagService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HashtagService);
//# sourceMappingURL=hashtag.service.js.map