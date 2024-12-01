import { PrismaService } from 'src/common/prisma/prisma.service';
import { BulkUpdateUnitsDto, BulkUpdateUnitsResponseDto } from 'src/models/unit/dto/bulk-update-units.dto';
import { CreateUnitDto } from 'src/models/unit/dto/create-unit.dto';
import { GetUnitResponseDto } from 'src/models/unit/dto/get-unit-response.dto';
import { UnitLearnResponseDto } from 'src/models/unit/dto/unit-learn.dto';
import { UpdateUnitDto } from 'src/models/unit/dto/update-unit.dto';
export declare class UnitService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUnitDto: CreateUnitDto, userId: string): Promise<GetUnitResponseDto>;
    getUnit(unitId: string): Promise<GetUnitResponseDto>;
    getUnitForLearning(unitId: string): Promise<UnitLearnResponseDto>;
    update(unitId: string, updateUnitDto: UpdateUnitDto): Promise<GetUnitResponseDto>;
    delete(unitId: string): Promise<GetUnitResponseDto>;
    bulkUpdate(data: BulkUpdateUnitsDto): Promise<BulkUpdateUnitsResponseDto>;
}
