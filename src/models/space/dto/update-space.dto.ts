import { PartialType } from '@nestjs/swagger';

import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';

export class UpdateSpaceDto extends PartialType(CreateSpaceDto) {}
