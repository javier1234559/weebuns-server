import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Space } from 'src/models/space/entities/space.entity';
export declare class SpacesResponse {
    data: Space[];
    pagination?: PaginationOutputDto;
}
