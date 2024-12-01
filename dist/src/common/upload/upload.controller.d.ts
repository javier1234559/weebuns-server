import { UploadFileResult } from 'uploadthing/types';
import { DeleteResponseDto } from 'src/common/upload/dto/delete-response.dto';
import { FileKeyDto } from 'src/common/upload/dto/file-key.dto';
import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File): Promise<UploadFileResult>;
    uploadMany(files: Express.Multer.File[]): Promise<UploadFileResult[]>;
    uploadVideo(file: Express.Multer.File): Promise<UploadFileResult>;
    deleteFile(params: FileKeyDto): Promise<DeleteResponseDto>;
}
