import {
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

// src/upload/dto/file-validation.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { UploadFileResult } from 'uploadthing/types';

import { UploadService } from './upload.service';

// src/upload/dto/delete-response.dto.ts
export class DeleteResponseDto {
  success: boolean;
  message: string;
}

export class FileKeyDto {
  @IsNotEmpty()
  @IsString()
  key: string;
}

@ApiTags('Upload')
@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|gif|pdf|doc|docx)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<UploadFileResult> {
    return this.uploadService.uploadFile(file);
  }

  @Delete(':key')
  @ApiResponse({
    status: 200,
    type: DeleteResponseDto,
  })
  async deleteFile(@Param() params: FileKeyDto): Promise<DeleteResponseDto> {
    return this.uploadService.deleteFile(params.key);
  }
}
