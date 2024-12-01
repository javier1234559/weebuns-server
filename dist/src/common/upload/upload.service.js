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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const server_1 = require("uploadthing/server");
let UploadService = class UploadService {
    constructor(configService) {
        this.configService = configService;
        this.utapi = new server_1.UTApi({
            token: this.configService.get('UPLOADTHING_TOKEN'),
        });
    }
    async uploadFile(file) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            const fileObject = new File([file.buffer], file.originalname, {
                type: file.mimetype,
            });
            const uploadResponse = await this.utapi.uploadFiles(fileObject);
            console.log('Upload response:', JSON.stringify(uploadResponse, null, 2));
            return uploadResponse;
        }
        catch (error) {
            console.error('Upload error:', error);
            throw new common_1.BadRequestException('Failed to upload file');
        }
    }
    async uploadMany(files) {
        try {
            if (!files?.length) {
                throw new common_1.BadRequestException('No files provided');
            }
            const uploadPromises = files.map(async (file) => {
                const fileObject = new File([file.buffer], file.originalname, {
                    type: file.mimetype,
                });
                return this.utapi.uploadFiles(fileObject);
            });
            const uploadResponses = await Promise.all(uploadPromises);
            console.log('Upload responses:', JSON.stringify(uploadResponses, null, 2));
            return uploadResponses;
        }
        catch (error) {
            console.error('Upload error:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to upload files');
        }
    }
    async deleteFile(fileKey) {
        try {
            await this.utapi.deleteFiles(fileKey);
            return {
                success: true,
                message: 'File deleted successfully',
            };
        }
        catch (error) {
            console.error('Delete error:', error);
            throw new common_1.BadRequestException('Failed to delete file');
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map