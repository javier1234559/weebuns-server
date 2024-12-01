import { PrismaService } from 'src/common/prisma/prisma.service';
import { DeleteHashtagResponseDto } from 'src/models/hashtag/dto/delete-hashtag-response.dto';
import { FindAllHashtagsDto } from 'src/models/hashtag/dto/find-all-hashtags.dto';
import { HashtagsResponseDto } from 'src/models/hashtag/dto/hashtags-response.dto';
export declare class HashtagService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(findAllHashtagsDto: FindAllHashtagsDto): Promise<HashtagsResponseDto>;
    deleteByName(name: string): Promise<DeleteHashtagResponseDto>;
    findOrCreateHashtags(hashtagNames: string[]): Promise<string[]>;
}
