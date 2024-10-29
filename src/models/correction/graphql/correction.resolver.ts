import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Prisma } from '@prisma/client';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { TransactionClient } from 'src/common/decorators/transaction-client.decorator';
import { UseTransaction } from 'src/common/interceptors/transaction.interceptor';
import { CorrectionService } from 'src/models/correction/correction.service';
import { CorrectionResponseAllDto } from 'src/models/correction/dto/correction-all-response.dto copy';
import { CorrectionResponseOneDto } from 'src/models/correction/dto/correction-one-response.dto';
import { CreateCorrectionDto } from 'src/models/correction/dto/create-correction.dto';
import { GetCorrectionsByEssay } from 'src/models/correction/dto/get-correction-by-essay.dto';
import { UpdateCorrectionDto } from 'src/models/correction/dto/update-correction.dto';
import { Correction } from 'src/models/correction/entities/correction.entity';

@Resolver(() => Correction)
@UseGuards(AuthGuard, RolesGuard)
export class CorrectionResolver {
  constructor(private readonly correctService: CorrectionService) {}

  @Roles(UserRole.USER)
  @Query(() => CorrectionResponseAllDto)
  async getCorrectionsByEssay(
    @Args('input') input: GetCorrectionsByEssay,
  ): Promise<CorrectionResponseAllDto> {
    return this.correctService.getAllByEssay(input);
  }

  @Roles(UserRole.USER)
  @Mutation(() => CorrectionResponseOneDto)
  async createCorrectionEssay(@Args('input') input: CreateCorrectionDto) {
    return this.correctService.create(input);
  }

  @Roles(UserRole.USER)
  @UseTransaction()
  @Mutation(() => CorrectionResponseOneDto)
  async updateCorrectionEssay(
    @TransactionClient() transaction: Prisma.TransactionClient,
    @Args('input') input: UpdateCorrectionDto,
  ) {
    return this.correctService.update(transaction, input);
  }
}
