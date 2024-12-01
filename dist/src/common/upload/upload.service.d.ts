import { ConfigService } from '@nestjs/config';
import { UploadFileResult } from 'uploadthing/types';
export declare class UploadService {
    private configService;
    private utapi;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File): Promise<UploadFileResult>;
    uploadMany(files: Express.Multer.File[]): Promise<UploadFileResult[]>;
    deleteFile(fileKey: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
