import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CorrectionService } from 'src/models/correction/correction.service';
import { CorrectionResponseOneDto } from 'src/models/correction/dto/correction-one-response.dto';
import { CreateCorrectionDto } from 'src/models/correction/dto/create-correction.dto';
import { Essay } from 'src/models/essay/entities/essay.entity';

@Resolver(() => Essay)
@UseGuards(AuthGuard, RolesGuard)
export class EssayResolver {
  constructor(private readonly correctService: CorrectionService) {}

  @Roles(UserRole.USER)
  @Mutation(() => CorrectionResponseOneDto)
  async getUserEssays(@Args('input') input: CreateCorrectionDto) {
    return this.correctService.create(input);
  }
}
