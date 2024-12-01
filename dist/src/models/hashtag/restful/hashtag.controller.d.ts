import { DeleteHashtagResponseDto } from 'src/models/hashtag/dto/delete-hashtag-response.dto';
import { FindAllHashtagsDto } from 'src/models/hashtag/dto/find-all-hashtags.dto';
import { HashtagsResponseDto } from 'src/models/hashtag/dto/hashtags-response.dto';
import { HashtagService } from 'src/models/hashtag/hashtag.service';
export declare class HashtagController {
    private readonly hashtagService;
    constructor(hashtagService: HashtagService);
    findAll(query: FindAllHashtagsDto): Promise<HashtagsResponseDto>;
    deleteByName(name: string): Promise<DeleteHashtagResponseDto>;
}
