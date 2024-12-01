import { PaginationInputDto } from 'src/common/dto/pagination.dto';
export declare class GetCorrectionsByEssayDto extends PaginationInputDto {
    essayId: string;
    search?: string;
}
