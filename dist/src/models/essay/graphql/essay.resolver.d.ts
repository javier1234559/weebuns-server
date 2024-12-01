import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { EssaysResponse } from 'src/models/essay/dto/essay-response';
import { FindAllEssaysDto } from 'src/models/essay/dto/find-all-essay.dto';
import { EssayService } from 'src/models/essay/essay.service';
export declare class EssayResolver {
    private readonly essayService;
    constructor(essayService: EssayService);
    getAllEssays(input: FindAllEssaysDto): Promise<EssaysResponse>;
    getUserEssays(user: IAuthPayload, input: FindAllEssaysDto): Promise<EssaysResponse>;
}
