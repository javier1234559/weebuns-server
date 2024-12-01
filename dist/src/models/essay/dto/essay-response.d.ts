import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Essay } from 'src/models/essay/entities/essay.entity';
export declare class EssaysResponse {
    data: Essay[];
    pagination: PaginationOutputDto;
}
