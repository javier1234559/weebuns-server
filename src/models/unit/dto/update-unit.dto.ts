import { PartialType } from '@nestjs/swagger';

import { CreateUnitDto } from 'src/models/unit/dto/create-unit.dto';

export class UpdateUnitDto extends PartialType(CreateUnitDto) {}
