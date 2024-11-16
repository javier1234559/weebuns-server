import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Prisma } from '@prisma/client';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TransactionClient } from 'src/common/decorators/transaction-client.decorator';
import { UseTransaction } from 'src/common/interceptor/transaction.interceptor';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CorrectionService } from 'src/models/correction/correction.service';
import { CorrectionResponseAllDto } from 'src/models/correction/dto/correction-all-response.dto copy';
import { CorrectionResponseOneDto } from 'src/models/correction/dto/correction-one-response.dto';
import { CreateCorrectionDto } from 'src/models/correction/dto/create-correction.dto';
import { GetCorrectionsByEssayDto } from 'src/models/correction/dto/get-correction-by-essay.dto';
import { UpdateCorrectionDto } from 'src/models/correction/dto/update-correction.dto';
import { Correction } from 'src/models/correction/entities/correction.entity';

@Resolver(() => Correction)
@UseGuards(AuthGuard, RolesGuard)
export class CorrectionResolver {
  constructor(private readonly correctService: CorrectionService) {}

  @Roles(UserRole.USER)
  @Query(() => CorrectionResponseAllDto, { nullable: true })
  async getCorrectionsByEssay(
    @Args('input') input: GetCorrectionsByEssayDto,
  ): Promise<CorrectionResponseAllDto> {
    return this.correctService.getAllByEssay(input);
  }

  @Roles(UserRole.USER)
  @Query(() => CorrectionResponseOneDto, { nullable: true })
  async getCorrectionIfExist(
    @CurrentUser() currentUser: IAuthPayload,
    @Args('essayId') essayId: string,
  ): Promise<CorrectionResponseOneDto> {
    return this.correctService.getByUserId(String(currentUser.sub), essayId);
  }

  @Roles(UserRole.USER)
  @UseTransaction()
  @Mutation(() => CorrectionResponseOneDto)
  async createCorrectionEssay(
    @TransactionClient() transaction: Prisma.TransactionClient,
    @CurrentUser() currentUser: IAuthPayload,
    @Args('input') input: CreateCorrectionDto,
  ) {
    return this.correctService.create(
      transaction,
      String(currentUser.sub),
      input,
    );
  }

  @Roles(UserRole.USER)
  @UseTransaction()
  @Mutation(() => CorrectionResponseOneDto)
  async updateCorrectionEssay(
    @TransactionClient() transaction: Prisma.TransactionClient,
    @CurrentUser() currentUser: IAuthPayload,
    @Args('input') input: UpdateCorrectionDto,
  ) {
    return this.correctService.update(
      transaction,
      String(currentUser.sub),
      input,
    );
  }
}
