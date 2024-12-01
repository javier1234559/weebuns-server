import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CreateVocabularyDto } from 'src/models/vocabulary/dto/create-vocabulary.dto';
import { FindAllVocabularyDto } from 'src/models/vocabulary/dto/find-all-vocabulary.dto';
import { FindOneVocabularyResponseDto } from 'src/models/vocabulary/dto/find-one-vocabulary-response.dto';
import { UpdateVocabularyDto } from 'src/models/vocabulary/dto/update-vocabulary.dto';
import { VocabularyResponse } from 'src/models/vocabulary/dto/vocabulary-response.dto';
import { VocabularyService } from 'src/models/vocabulary/vocabulary.service';
export declare class VocabularyController {
    private readonly vocabularyService;
    constructor(vocabularyService: VocabularyService);
    create(currentUser: IAuthPayload, createVocabularyDto: CreateVocabularyDto): Promise<FindOneVocabularyResponseDto>;
    findAll(findAllVocabulariesDto: FindAllVocabularyDto): Promise<VocabularyResponse>;
    findOne(id: string): Promise<FindOneVocabularyResponseDto>;
    update(id: string, updateVocabularyDto: UpdateVocabularyDto): Promise<FindOneVocabularyResponseDto>;
    delete(id: string): Promise<FindOneVocabularyResponseDto>;
}
