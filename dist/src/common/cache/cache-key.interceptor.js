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
var CacheKeyInterceptor_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheKeyInterceptor = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const cache_manager_2 = require("cache-manager");
const crypto_1 = require("crypto");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let CacheKeyInterceptor = CacheKeyInterceptor_1 = class CacheKeyInterceptor {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
        this.logger = new common_1.Logger(CacheKeyInterceptor_1.name);
    }
    async intercept(context, next) {
        const metadata = Reflect.getMetadata('cache_key_metadata', context.getHandler());
        if (!metadata) {
            this.logger.debug('No cache metadata found');
            return next.handle();
        }
        const { prefix, ttl } = metadata;
        const request = context.switchToHttp().getRequest();
        const dto = request.body;
        const keyString = Object.entries(dto)
            .map(([key, value]) => `${key}:${value}`)
            .sort()
            .join('-');
        const hash = (0, crypto_1.createHash)('md5').update(keyString).digest('hex');
        const cacheKey = prefix ? `${prefix}-${hash}` : hash;
        this.logger.debug(`Cache key: ${cacheKey}`);
        try {
            const cachedData = await this.cacheManager.get(cacheKey);
            if (cachedData) {
                this.logger.debug(`Cache hit for key: ${cacheKey}`);
                return (0, rxjs_1.of)(cachedData);
            }
            this.logger.debug(`Cache miss for key: ${cacheKey}`);
            return next.handle().pipe((0, operators_1.tap)(async (data) => {
                try {
                    await this.cacheManager.set(cacheKey, data, { ttl });
                    this.logger.debug(`Cached data for key: ${cacheKey}`);
                }
                catch (error) {
                    this.logger.error(`Failed to cache data: ${error.message}`);
                }
            }));
        }
        catch (error) {
            this.logger.error(`Cache error: ${error.message}`);
            return next.handle();
        }
    }
};
exports.CacheKeyInterceptor = CacheKeyInterceptor;
exports.CacheKeyInterceptor = CacheKeyInterceptor = CacheKeyInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _a : Object])
], CacheKeyInterceptor);
//# sourceMappingURL=cache-key.interceptor.js.map