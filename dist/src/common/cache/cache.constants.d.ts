export declare const CACHE_TTL: {
    SPACES: number;
    AI_TRANSLATIONS: number;
    AI_GRAMMAR: number;
    AI_TOPICS: number;
};
export declare const CACHE_KEYS: {
    SPACES: (id?: string) => string;
    AI_TRANSLATIONS: (text: string, from: string, to: string) => string;
    AI_GRAMMAR: (text: string) => string;
    AI_TOPICS: (category?: string) => string;
};
export declare const CACHE_KEY_METADATA = "cache_key_metadata";
export interface CacheKeyMetadata {
    prefix: string;
    ttl: number;
}
