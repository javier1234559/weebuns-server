import { Resolver } from '@nestjs/graphql';

import { Space } from '../entities/space.entity';
import { SpaceService } from '../space.service';

@Resolver(() => Space)
export class SpaceResolver {
  constructor(private readonly spaceService: SpaceService) {}
}
