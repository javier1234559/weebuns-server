import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Vocabulary } from 'src/models/vocabulary/entities/vocabulary.entity';
export declare class VocabularyResponse {
    data: Vocabulary[];
    pagination: PaginationOutputDto;
}
