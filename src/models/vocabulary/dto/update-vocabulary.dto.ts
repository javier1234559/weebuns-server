import { PartialType } from '@nestjs/swagger';

import { CreateVocabularyDto } from 'src/models/vocabulary/dto/create-vocabulary.dto';

export class UpdateVocabularyDto extends PartialType(CreateVocabularyDto) {}
