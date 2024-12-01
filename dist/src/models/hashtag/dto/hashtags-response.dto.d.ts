import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Hashtag } from 'src/models/hashtag/entities/hashtag.entity';
export declare class HashtagsResponseDto {
    data: Hashtag[];
    pagination?: PaginationOutputDto;
}
