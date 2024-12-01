import { PaginationInputDto } from 'src/common/dto/pagination.dto';
export declare class FindAllNotesDto extends PaginationInputDto {
    search?: string;
    tags?: string[];
    isBookmarked?: boolean;
    spaceId?: string;
}
