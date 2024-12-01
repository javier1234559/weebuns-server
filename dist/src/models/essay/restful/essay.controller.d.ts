import { Prisma } from '@prisma/client';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CreateEssayResponseDto } from 'src/models/essay/dto/create-essay-response.dto';
import { CreateEssayDto } from 'src/models/essay/dto/create-essay.dto';
import { DeleteEssayResponseDto } from 'src/models/essay/dto/delete-space-response.dto';
import { EssaysResponse } from 'src/models/essay/dto/essay-response';
import { FindAllEssaysDto } from 'src/models/essay/dto/find-all-essay.dto';
import { FindOneEssayResponseDto } from 'src/models/essay/dto/find-one-essay-reponse.dto';
import { FindOneEssayDto } from 'src/models/essay/dto/find-one-essay.dto';
import { UpdateEssayDto } from 'src/models/essay/dto/update-essay.dto';
import { UpdateEssayResponseDto } from 'src/models/essay/dto/update-space-response.dto';
import { EssayService } from 'src/models/essay/essay.service';
export declare class EssayController {
    private readonly essayService;
    constructor(essayService: EssayService);
    findAll(query: FindAllEssaysDto): Promise<EssaysResponse>;
    findAllByUser(user: IAuthPayload, query: FindAllEssaysDto): Promise<EssaysResponse>;
    findOne(params: FindOneEssayDto): Promise<FindOneEssayResponseDto>;
    create(user: IAuthPayload, transaction: Prisma.TransactionClient, dto: CreateEssayDto): Promise<CreateEssayResponseDto>;
    update(user: IAuthPayload, transaction: Prisma.TransactionClient, params: FindOneEssayDto, dto: UpdateEssayDto): Promise<UpdateEssayResponseDto>;
    deleteByUser(params: FindOneEssayDto): Promise<DeleteEssayResponseDto>;
    delete(params: FindOneEssayDto): Promise<DeleteEssayResponseDto>;
}
