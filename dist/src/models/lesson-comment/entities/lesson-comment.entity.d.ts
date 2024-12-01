import { Lesson } from 'src/models/lesson/entities/lesson.entity';
import { User } from 'src/models/user/entities/user.entity';
export declare class LessonComment {
    id: string;
    lessonId: string;
    createdBy: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    lesson?: Lesson;
    creator?: User;
}
