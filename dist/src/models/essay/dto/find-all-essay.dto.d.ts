import { ContentStatus } from '@prisma/client';
import { PaginationInputDto } from 'src/common/dto/pagination.dto';
export declare class FindAllEssaysDto extends PaginationInputDto {
    search?: string;
    status?: ContentStatus;
}
