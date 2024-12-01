export declare class NoteDto {
    id: string;
    title: string;
    content: string;
    tags: string[];
    isBookmarked: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
