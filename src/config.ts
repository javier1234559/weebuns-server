import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config = {
  mode: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  host: process.env.HOST,
  // Database configuration
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  // JWT configuration
  jwt: {
    privateKey: process.env.JWT_PRIVATE_KEY,
    publicKey: process.env.JWT_PUBLIC_KEY,
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
};

console.log(config);
export default config;
