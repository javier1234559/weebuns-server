import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { DeleteHashtagResponseDto } from 'src/models/hashtag/dto/delete-hashtag-response.dto';
import { FindAllHashtagsDto } from 'src/models/hashtag/dto/find-all-hashtags.dto';
import { HashtagsResponseDto } from 'src/models/hashtag/dto/hashtags-response.dto';
import { HashtagService } from 'src/models/hashtag/hashtag.service';

@Controller('hashtags')
@ApiTags('hashtags')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: HashtagsResponseDto })
  async findAll(
    @Query() query: FindAllHashtagsDto,
  ): Promise<HashtagsResponseDto> {
    return this.hashtagService.findAll(query);
  }

  @Delete(':name')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiParam({ name: 'name', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteHashtagResponseDto })
  async deleteByName(
    @Param('name') name: string,
  ): Promise<DeleteHashtagResponseDto> {
    return this.hashtagService.deleteByName(name);
  }
}
