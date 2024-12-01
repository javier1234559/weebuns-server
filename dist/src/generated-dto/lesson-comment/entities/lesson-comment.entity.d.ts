import { Lesson } from '../../lesson/entities/lesson.entity';
import { User } from '../../user/entities/user.entity';
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
