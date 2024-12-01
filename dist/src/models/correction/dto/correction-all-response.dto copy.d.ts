import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { CorrectionResponseOneDto } from 'src/models/correction/dto/correction-one-response.dto';
export declare class CorrectionResponseAllDto {
    data: CorrectionResponseOneDto[];
    pagination?: PaginationOutputDto;
}
