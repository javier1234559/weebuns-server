"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_KEY_METADATA = exports.CACHE_KEYS = exports.CACHE_TTL = void 0;
exports.CACHE_TTL = {
    SPACES: 3600,
    AI_TRANSLATIONS: 86400,
    AI_GRAMMAR: 86400,
    AI_TOPICS: 3600,
};
exports.CACHE_KEYS = {
    SPACES: (id) => `spaces:${id || 'all'}`,
    AI_TRANSLATIONS: (text, from, to) => `translations:${from}:${to}:${text.substring(0, 50)}`,
    AI_GRAMMAR: (text) => `grammar:${text.substring(0, 50)}`,
    AI_TOPICS: (category) => `topics:${category || 'all'}`,
};
exports.CACHE_KEY_METADATA = 'cache_key_metadata';
//# sourceMappingURL=cache.constants.js.map