import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CreateLessonDto } from 'src/models/lesson/dto/create-lesson.dto';
import { LessonResponseDto } from 'src/models/lesson/dto/lesson-response.dto';
import { UpdateLessonDto } from 'src/models/lesson/dto/update-lesson.dto';
import { LessonService } from 'src/models/lesson/lesson.service';
import { FindOneNoteResponseDto } from 'src/models/note/dto/find-one-note-response.dto';
import { NoteService } from 'src/models/note/note.service';
import { BulkUpdateUnitsDto, BulkUpdateUnitsResponseDto } from 'src/models/unit/dto/bulk-update-units.dto';
import { CreateUnitDto } from 'src/models/unit/dto/create-unit.dto';
import { GetUnitResponseDto } from 'src/models/unit/dto/get-unit-response.dto';
import { UnitLearnResponseDto } from 'src/models/unit/dto/unit-learn.dto';
import { UpdateUnitDto } from 'src/models/unit/dto/update-unit.dto';
import { UnitService } from 'src/models/unit/unit.service';
export declare class UnitController {
    private readonly unitService;
    private readonly noteService;
    private readonly lessonService;
    constructor(unitService: UnitService, noteService: NoteService, lessonService: LessonService);
    createUnit(createUnitDto: CreateUnitDto, user: IAuthPayload): Promise<GetUnitResponseDto>;
    getUnit(unitId: string): Promise<GetUnitResponseDto>;
    learnUnit(unitId: string): Promise<UnitLearnResponseDto>;
    learnLesson(id: string, lessonId: string): Promise<LessonResponseDto>;
    deleteUnit(unitId: string): Promise<GetUnitResponseDto>;
    bulkUpdateUnits(bulkUpdateDto: BulkUpdateUnitsDto): Promise<BulkUpdateUnitsResponseDto>;
    updateUnit(unitId: string, updateUnitDto: UpdateUnitDto): Promise<GetUnitResponseDto>;
    getLessonNote(unitId: string, lessonId: string): Promise<FindOneNoteResponseDto>;
    getLesson(unitId: string, lessonId: string): Promise<LessonResponseDto>;
    createLesson(unitId: string, user: IAuthPayload, createLessonDto: CreateLessonDto): Promise<LessonResponseDto>;
    updateLesson(unitId: string, lessonId: string, updateLessonDto: UpdateLessonDto): Promise<LessonResponseDto>;
    deleteLesson(unitId: string, lessonId: string): Promise<LessonResponseDto>;
}