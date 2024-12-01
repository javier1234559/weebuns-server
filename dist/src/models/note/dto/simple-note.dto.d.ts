import { Course } from 'src/models/course/entities/course.entity';
import { LessonWithoutContent } from 'src/models/lesson/dto/lesson-without-content.dto';
export declare class SimplifiedNoteDto {
    id: string;
    spaceId: string | null;
    lessonId: string;
    content: string;
    title: string;
    tags: string[];
    isBookmarked: boolean;
    lesson?: LessonWithoutContent;
    course?: Course;
    createdAt: Date;
}
