import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { SimplifiedNoteDto } from 'src/models/note/dto/simple-note.dto';
export declare class NotesResponse {
    data: SimplifiedNoteDto[];
    pagination: PaginationOutputDto;
}
