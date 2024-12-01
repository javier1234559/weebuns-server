import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateVocabularyDto } from 'src/models/vocabulary/dto/create-vocabulary.dto';
import { FindAllVocabularyDto } from 'src/models/vocabulary/dto/find-all-vocabulary.dto';
import { FindOneVocabularyResponseDto } from 'src/models/vocabulary/dto/find-one-vocabulary-response.dto';
import { UpdateVocabularyDto } from 'src/models/vocabulary/dto/update-vocabulary.dto';
import { VocabularyResponse } from 'src/models/vocabulary/dto/vocabulary-response.dto';
export declare class VocabularyService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly includeQuery;
    create(createVocabularyDto: CreateVocabularyDto, currentUser: IAuthPayload): Promise<FindOneVocabularyResponseDto>;
    findAll(query: FindAllVocabularyDto): Promise<VocabularyResponse>;
    findOne(id: string): Promise<FindOneVocabularyResponseDto>;
    update(id: string, updateVocabularyDto: UpdateVocabularyDto): Promise<FindOneVocabularyResponseDto>;
    delete(id: string): Promise<FindOneVocabularyResponseDto>;
}
