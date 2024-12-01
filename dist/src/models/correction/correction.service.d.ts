import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CorrectionResponseAllDto } from 'src/models/correction/dto/correction-all-response.dto copy';
import { CorrectionResponseOneDto } from 'src/models/correction/dto/correction-one-response.dto';
import { CreateCorrectionDto } from 'src/models/correction/dto/create-correction.dto';
import { GetCorrectionsByEssayDto } from 'src/models/correction/dto/get-correction-by-essay.dto';
import { UpdateCorrectionDto } from 'src/models/correction/dto/update-correction.dto';
export declare class CorrectionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly includeQuery;
    private buildCorrectionSearchQuery;
    getByUserId(userId: string, essayId: string): Promise<CorrectionResponseOneDto>;
    getAllByEssay(input: GetCorrectionsByEssayDto): Promise<CorrectionResponseAllDto>;
    create(tx: Prisma.TransactionClient, userId: string, createCorrectionDto: CreateCorrectionDto): Promise<CorrectionResponseOneDto>;
    update(tx: Prisma.TransactionClient, userId: string, updateCorrectionDto: UpdateCorrectionDto): Promise<CorrectionResponseOneDto>;
    private validateCorrectionOwnership;
    private handleSentencesUpdate;
}
