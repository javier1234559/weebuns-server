import { PartialType } from '@nestjs/swagger';

import { CreateUnitContentDto } from 'src/models/unit-content/dto/create-unit-content.dto';

export class UpdateUnitContentDto extends PartialType(CreateUnitContentDto) {}
