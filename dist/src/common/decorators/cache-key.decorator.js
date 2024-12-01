"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheKeyDto = CacheKeyDto;
const common_1 = require("@nestjs/common");
const cache_constants_1 = require("../cache/cache.constants");
function CacheKeyDto(prefix = '', ttl = 86400) {
    return (0, common_1.SetMetadata)(cache_constants_1.CACHE_KEY_METADATA, {
        prefix,
        ttl,
    });
}
//# sourceMappingURL=cache-key.decorator.js.map