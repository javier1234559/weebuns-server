import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CreateUnitContentDto } from 'src/models/unit-content/dto/create-unit-content.dto';
import { GetUnitContentResponseDto } from 'src/models/unit-content/dto/get-unit-content-response.dto';
import { UnitContentService } from 'src/models/unit-content/unit-content.service';

@ApiTags('UnitContents')
@Controller('unit-contents')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(CacheInterceptor)
export class UnitContentController {
  constructor(private readonly unitContentService: UnitContentService) {}

  @Post(':unitId')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GetUnitContentResponseDto,
  })
  async createUnitContent(
    @Param('unitId') unitId: string,
    @Body() createUnitContentDto: CreateUnitContentDto,
  ): Promise<GetUnitContentResponseDto> {
    return this.unitContentService.createUnitContent(
      unitId,
      createUnitContentDto,
    );
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @CacheTTL(300) // Cache for 5 minutes
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK, type: GetUnitContentResponseDto })
  async getUnitContentDetail(
    @CurrentUser() user: IAuthPayload,
    @Param('id') contentId: string,
  ): Promise<GetUnitContentResponseDto> {
    const userId = user ? String(user.sub) : undefined;
    return this.unitContentService.getUnitContentDetail(contentId, userId);
  }
}
