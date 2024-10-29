import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { GetUserSpacesDto } from 'src/models/space/dto/get-user-space.dto';
import { SpacesResponse } from 'src/models/space/dto/spaces-response.dto';

import { Space } from '../entities/space.entity';
import { SpaceService } from '../space.service';

@Resolver(() => Space)
@UseGuards(AuthGuard, RolesGuard)
export class SpaceResolver {
  constructor(private readonly spaceService: SpaceService) {}

  @Roles(UserRole.USER)
  @Query(() => SpacesResponse)
  async getUserSpaces(
    @Args('input') input: GetUserSpacesDto,
  ): Promise<SpacesResponse> {
    return this.spaceService.findUserSpaces(input);
  }
}
