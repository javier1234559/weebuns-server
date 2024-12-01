export declare const MAX_AGE = "3d";
export declare const MAX_ACCESS_TOKEN_AGE = "3d";
export declare const MAX_REFRESH_TOKEN_AGE = "7d";
declare const config: {
    mode: string;
    port: number;
    host: string;
    database: string;
    jwt: {
        jwtAccessSecret: string;
        jwtRefreshSecret: string;
    };
    aws: {
        s3: {
            accessKey: string;
            secretKey: string;
            region: string;
            bucketName: string;
        };
    };
    googleClientID: string;
    googleClientSecret: string;
    upload_token: string;
    cache: string;
};
export default config;
