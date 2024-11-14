import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TransactionClient } from 'src/common/decorators/transaction-client.decorator';
import { UseTransaction } from 'src/common/interceptor/transaction.interceptor';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CreateEssayResponseDto } from 'src/models/essay/dto/create-essay-response.dto';
import { CreateEssayDto } from 'src/models/essay/dto/create-essay.dto';
import { DeleteEssayResponseDto } from 'src/models/essay/dto/delete-space-response.dto';
import { EssaysResponse } from 'src/models/essay/dto/essay-response';
import { FindAllEssaysDto } from 'src/models/essay/dto/find-all-essay.dto';
import { FindOneEssayResponseDto } from 'src/models/essay/dto/find-one-essay-reponse.dto';
import { FindOneEssayDto } from 'src/models/essay/dto/find-one-essay.dto';
import { UpdateEssayDto } from 'src/models/essay/dto/update-essay.dto';
import { UpdateEssayResponseDto } from 'src/models/essay/dto/update-space-response.dto';
import { EssayService } from 'src/models/essay/essay.service';

@Controller('essays')
@ApiTags('essays')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(CacheInterceptor)
export class EssayController {
  constructor(private readonly essayService: EssayService) {}

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @CacheTTL(300) // 5 minutes
  @ApiResponse({ status: HttpStatus.OK, type: EssaysResponse })
  async findAll(@Query() query: FindAllEssaysDto): Promise<EssaysResponse> {
    return this.essayService.findAll(query);
  }

  @Get('/user')
  @Roles(UserRole.USER)
  @ApiResponse({ status: HttpStatus.OK, type: EssaysResponse })
  async findAllByUser(
    @CurrentUser() user: IAuthPayload,
    @Query() query: FindAllEssaysDto,
  ): Promise<EssaysResponse> {
    return this.essayService.findAllByUser(query, user);
  }

  @Get(':id')
  @Roles(UserRole.USER)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: FindOneEssayResponseDto })
  async findOne(
    @Param() params: FindOneEssayDto,
  ): Promise<FindOneEssayResponseDto> {
    return this.essayService.findOne(params.id);
  }

  @Post()
  @Roles(UserRole.USER)
  @UseTransaction()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateEssayResponseDto })
  async create(
    @CurrentUser() user: IAuthPayload,
    @TransactionClient() transaction: Prisma.TransactionClient,
    @Body() dto: CreateEssayDto,
  ): Promise<CreateEssayResponseDto> {
    return this.essayService.create(transaction, dto, user);
  }

  @Patch(':id')
  @Roles(UserRole.USER)
  @UseTransaction()
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateEssayResponseDto })
  async update(
    @CurrentUser() user: IAuthPayload,
    @TransactionClient() transaction: Prisma.TransactionClient,
    @Param() params: FindOneEssayDto,
    @Body() dto: UpdateEssayDto,
  ): Promise<UpdateEssayResponseDto> {
    return this.essayService.update(transaction, params.id, dto, user);
  }

  @Delete(':id/user')
  @Roles(UserRole.USER)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteEssayResponseDto })
  async deleteByUser(
    @Param() params: FindOneEssayDto,
  ): Promise<DeleteEssayResponseDto> {
    return this.essayService.deleteByUser(params.id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteEssayResponseDto })
  async delete(
    @Param() params: FindOneEssayDto,
  ): Promise<DeleteEssayResponseDto> {
    return this.essayService.delete(params.id);
  }
}
