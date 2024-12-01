import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { SpaceCoursesJoinedResponseDto } from 'src/models/space/dto/course-joined.dto';
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import { DeleteSpaceResponseDto } from 'src/models/space/dto/delete-space-response.dto';
import { ExploreCoursesQueryDto } from 'src/models/space/dto/explore-course-query.dto';
import { FindAllSpacesDto } from 'src/models/space/dto/find-all-spaces.dto';
import { FindOneSpaceResponseDto } from 'src/models/space/dto/find-one-space-response.dto';
import { GetSpacesUserDto } from 'src/models/space/dto/get-space-user.dto';
import { GetUserSpacesDto } from 'src/models/space/dto/get-user-space.dto';
import { SpaceCoursesAllResponseDto } from 'src/models/space/dto/space-course-all-response.dto';
import { SpacesResponse } from 'src/models/space/dto/spaces-response.dto';
import { UpdateSpaceDto } from 'src/models/space/dto/update-space.dto';
export declare class SpaceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly spaceIncludeQuery;
    create(createSpaceDto: CreateSpaceDto, created_by: IAuthPayload): Promise<FindOneSpaceResponseDto>;
    findAll(findAllSpacesDto: FindAllSpacesDto): Promise<SpacesResponse>;
    findOne(id: string): Promise<FindOneSpaceResponseDto>;
    update(id: string, updateSpaceDto: UpdateSpaceDto): Promise<FindOneSpaceResponseDto>;
    delete(id: string): Promise<DeleteSpaceResponseDto>;
    findUserSpaces(input: GetUserSpacesDto): Promise<SpacesResponse>;
    getSpacesUser(userId: string, query: GetSpacesUserDto): Promise<SpacesResponse>;
    getSpaceCoursesJoined(userId: string, spaceId: string, page: number, perPage: number): Promise<SpaceCoursesJoinedResponseDto>;
    getSpaceCourses(userId: string | null, spaceId: string, query: ExploreCoursesQueryDto): Promise<SpaceCoursesAllResponseDto>;
}
