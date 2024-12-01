import { Prisma } from '@prisma/client';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CorrectionService } from 'src/models/correction/correction.service';
import { CorrectionResponseAllDto } from 'src/models/correction/dto/correction-all-response.dto copy';
import { CorrectionResponseOneDto } from 'src/models/correction/dto/correction-one-response.dto';
import { CreateCorrectionDto } from 'src/models/correction/dto/create-correction.dto';
import { GetCorrectionsByEssayDto } from 'src/models/correction/dto/get-correction-by-essay.dto';
import { UpdateCorrectionDto } from 'src/models/correction/dto/update-correction.dto';
export declare class CorrectionResolver {
    private readonly correctService;
    constructor(correctService: CorrectionService);
    getCorrectionsByEssay(input: GetCorrectionsByEssayDto): Promise<CorrectionResponseAllDto>;
    getCorrectionIfExist(currentUser: IAuthPayload, essayId: string): Promise<CorrectionResponseOneDto>;
    createCorrectionEssay(transaction: Prisma.TransactionClient, currentUser: IAuthPayload, input: CreateCorrectionDto): Promise<CorrectionResponseOneDto>;
    updateCorrectionEssay(transaction: Prisma.TransactionClient, currentUser: IAuthPayload, input: UpdateCorrectionDto): Promise<CorrectionResponseOneDto>;
}
