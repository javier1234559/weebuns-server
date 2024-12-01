import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { CreateNoteDto } from 'src/models/note/dto/create-note.dto';
import { NotesResponse } from 'src/models/note/dto/find-all-note-response.dto';
import { FindAllNotesDto } from 'src/models/note/dto/find-all-notes.dto';
import { FindOneNoteResponseDto } from 'src/models/note/dto/find-one-note-response.dto';
import { UpdateNoteDto } from 'src/models/note/dto/update-note.dto';
import { NoteService } from 'src/models/note/note.service';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    create(currentUser: IAuthPayload, dto: CreateNoteDto): Promise<FindOneNoteResponseDto>;
    createOrUpdate(currentUser: IAuthPayload, dto: CreateNoteDto): Promise<FindOneNoteResponseDto>;
    findAll(query: FindAllNotesDto): Promise<NotesResponse>;
    findOne(id: string): Promise<FindOneNoteResponseDto>;
    update(id: string, dto: UpdateNoteDto): Promise<FindOneNoteResponseDto>;
    delete(id: string): Promise<FindOneNoteResponseDto>;
}
