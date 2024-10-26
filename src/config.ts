import { config as dotenvConfig } from 'dotenv';

import { logger } from 'src/common/utils/logger';

dotenvConfig();

export const MAX_AGE = '3d';

const config = {
  mode: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  host: process.env.HOST,
  // Database configuration
  database: process.env.DATABASE_URL,
  // JWT configuration
  jwt: {
    jwtAccessSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_SECRET,
  },
  // AWS S3 configuration
  aws: {
    s3: {
      accessKey: process.env.AWS_S3_ACCESS_KEY,
      secretKey: process.env.AWS_S3_SECRET_KEY,
      region: process.env.AWS_S3_REGION,
      bucketName: process.env.AWS_S3_BUCKET_NAME,
    },
  },
  // Google OAuth configuration
  googleClientID: process.env.GOOGLE_AUTH_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
};

logger.info('Configuration loaded:', config);
export default config;
