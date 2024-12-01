import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { SpaceCoursesJoinedResponseDto } from 'src/models/space/dto/course-joined.dto';
import { CreateSpaceDto } from 'src/models/space/dto/create-space.dto';
import { DeleteSpaceResponseDto } from 'src/models/space/dto/delete-space-response.dto';
import { ExploreCoursesQueryDto } from 'src/models/space/dto/explore-course-query.dto';
import { FindAllSpacesDto } from 'src/models/space/dto/find-all-spaces.dto';
import { FindOneSpaceResponseDto } from 'src/models/space/dto/find-one-space-response.dto';
import { GetSpacesUserDto } from 'src/models/space/dto/get-space-user.dto';
import { SpaceCoursesAllResponseDto } from 'src/models/space/dto/space-course-all-response.dto';
import { SpacesResponse } from 'src/models/space/dto/spaces-response.dto';
import { UpdateSpaceDto } from 'src/models/space/dto/update-space.dto';
import { SpaceService } from 'src/models/space/space.service';
export declare class SpaceController {
    private readonly spaceService;
    constructor(spaceService: SpaceService);
    findAll(query: FindAllSpacesDto): Promise<SpacesResponse>;
    getUserSpaces(user: IAuthPayload, query: GetSpacesUserDto): Promise<SpacesResponse>;
    findOne(id: string): Promise<FindOneSpaceResponseDto>;
    create(user: IAuthPayload, dto: CreateSpaceDto): Promise<FindOneSpaceResponseDto>;
    update(id: string, dto: UpdateSpaceDto): Promise<FindOneSpaceResponseDto>;
    delete(id: string): Promise<DeleteSpaceResponseDto>;
    getSpaceCoursesJoined(user: IAuthPayload, spaceId: string, page?: number, perPage?: number): Promise<SpaceCoursesJoinedResponseDto>;
    getSpaceCourses(user: IAuthPayload, spaceId: string, query: ExploreCoursesQueryDto): Promise<SpaceCoursesAllResponseDto>;
}
