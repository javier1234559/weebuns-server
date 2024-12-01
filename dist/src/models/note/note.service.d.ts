import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateNoteDto } from 'src/models/note/dto/create-note.dto';
import { NotesResponse } from 'src/models/note/dto/find-all-note-response.dto';
import { FindAllNotesDto } from 'src/models/note/dto/find-all-notes.dto';
import { FindOneNoteResponseDto } from 'src/models/note/dto/find-one-note-response.dto';
import { UpdateNoteDto } from 'src/models/note/dto/update-note.dto';
export declare class NoteService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly selectQuery;
    createOrUpdate(dto: CreateNoteDto, currentUser: IAuthPayload): Promise<FindOneNoteResponseDto>;
    create(dto: CreateNoteDto, currentUser: IAuthPayload): Promise<FindOneNoteResponseDto>;
    findAll(query: FindAllNotesDto): Promise<NotesResponse>;
    findOne(id: string): Promise<FindOneNoteResponseDto>;
    findOneByLessonId(lessonId: string): Promise<FindOneNoteResponseDto>;
    update(id: string, dto: UpdateNoteDto): Promise<FindOneNoteResponseDto>;
    delete(id: string): Promise<FindOneNoteResponseDto>;
}
