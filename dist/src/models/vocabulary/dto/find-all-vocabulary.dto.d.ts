import { PaginationInputDto } from 'src/common/dto/pagination.dto';
export declare class FindAllVocabularyDto extends PaginationInputDto {
    search?: string;
    tags?: string[];
    dueDate?: boolean;
    spaceId?: string;
}
