import { CreateNoteDto } from 'src/models/note/dto/create-note.dto';
declare const UpdateNoteDto_base: import("@nestjs/common").Type<Partial<CreateNoteDto>>;
export declare class UpdateNoteDto extends UpdateNoteDto_base {
    isBookmarked?: boolean;
}
export {};
