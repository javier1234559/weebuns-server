import { Prisma } from '@prisma/client';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateEssayResponseDto } from 'src/models/essay/dto/create-essay-response.dto';
import { CreateEssayDto } from 'src/models/essay/dto/create-essay.dto';
import { DeleteEssayResponseDto } from 'src/models/essay/dto/delete-space-response.dto';
import { EssaysResponse } from 'src/models/essay/dto/essay-response';
import { FindAllEssaysDto } from 'src/models/essay/dto/find-all-essay.dto';
import { FindOneEssayResponseDto } from 'src/models/essay/dto/find-one-essay-reponse.dto';
import { UpdateEssayDto } from 'src/models/essay/dto/update-essay.dto';
import { UpdateEssayResponseDto } from 'src/models/essay/dto/update-space-response.dto';
import { HashtagService } from 'src/models/hashtag/hashtag.service';
export declare class EssayService {
    private readonly prisma;
    private readonly hashTagService;
    constructor(prisma: PrismaService, hashTagService: HashtagService);
    private readonly defaultInclude;
    findAllByUser(query: FindAllEssaysDto, user: IAuthPayload): Promise<EssaysResponse>;
    create(tx: Prisma.TransactionClient, createEssayDto: CreateEssayDto, user: IAuthPayload): Promise<CreateEssayResponseDto>;
    findAll(query: FindAllEssaysDto): Promise<EssaysResponse>;
    findOne(id: string): Promise<FindOneEssayResponseDto>;
    update(tx: Prisma.TransactionClient, id: string, updateEssayDto: UpdateEssayDto, user: IAuthPayload): Promise<UpdateEssayResponseDto>;
    deleteByUser(id: string): Promise<DeleteEssayResponseDto>;
    delete(id: string): Promise<DeleteEssayResponseDto>;
    private mapEssayResponse;
}
