import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { RolesGuard } from 'src/common/auth/role.guard';
import { CorrectionService } from 'src/models/correction/correction.service';
import { Essay } from 'src/models/essay/entities/essay.entity';

@Resolver(() => Essay)
@UseGuards(AuthGuard, RolesGuard)
export class EssayResolver {
  constructor(private readonly correctService: CorrectionService) {}

  // @Roles(UserRole.USER)
  // @Mutation(() => CorrectionResponseOneDto)
  // async getUserEssays(@Args('input') input: CreateCorrectionDto) {
  //   return this.correctService.create(input);
  // }
}
