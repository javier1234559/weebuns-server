"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_REFRESH_TOKEN_AGE = exports.MAX_ACCESS_TOKEN_AGE = exports.MAX_AGE = void 0;
const dotenv_1 = require("dotenv");
const logger_1 = require("./common/utils/logger");
(0, dotenv_1.config)();
exports.MAX_AGE = '3d';
exports.MAX_ACCESS_TOKEN_AGE = '3d';
exports.MAX_REFRESH_TOKEN_AGE = '7d';
const config = {
    mode: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    host: process.env.HOST,
    database: process.env.DATABASE_URL,
    jwt: {
        jwtAccessSecret: process.env.JWT_SECRET,
        jwtRefreshSecret: process.env.JWT_SECRET,
    },
    aws: {
        s3: {
            accessKey: process.env.AWS_S3_ACCESS_KEY,
            secretKey: process.env.AWS_S3_SECRET_KEY,
            region: process.env.AWS_S3_REGION,
            bucketName: process.env.AWS_S3_BUCKET_NAME,
        },
    },
    googleClientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    upload_token: process.env.UPLOADTHING_TOKEN,
    cache: process.env.UPSTASH_REDIS_REST_URL,
};
logger_1.logger.info('Configuration loaded:', config);
exports.default = config;
//# sourceMappingURL=config.js.map