import { GetUserSpacesDto } from 'src/models/space/dto/get-user-space.dto';
import { SpacesResponse } from 'src/models/space/dto/spaces-response.dto';
import { SpaceService } from '../space.service';
export declare class SpaceResolver {
    private readonly spaceService;
    constructor(spaceService: SpaceService);
    getUserSpaces(input: GetUserSpacesDto): Promise<SpacesResponse>;
}
