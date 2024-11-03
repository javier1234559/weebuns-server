import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { EssaysResponse } from 'src/models/essay/dto/essay-response';
import { FindAllEssaysDto } from 'src/models/essay/dto/find-all-essay.dto';
import { Essay } from 'src/models/essay/entities/essay.entity';
import { EssayService } from 'src/models/essay/essay.service';

@Resolver(() => Essay)
@UseGuards(AuthGuard, RolesGuard)
export class EssayResolver {
  constructor(private readonly essayService: EssayService) {}

  @Roles(UserRole.USER, UserRole.ADMIN)
  @Query(() => EssaysResponse)
  async getAllEssays(
    @Args('input') input: FindAllEssaysDto,
  ): Promise<EssaysResponse> {
    return this.essayService.findAll(input);
  }

  @Roles(UserRole.USER)
  @Query(() => EssaysResponse, { nullable: true })
  async getUserEssays(
    @CurrentUser() user: IAuthPayload,
    @Args('input') input: FindAllEssaysDto,
  ): Promise<EssaysResponse> {
    return this.essayService.findAllByUser(input, user);
  }
}
