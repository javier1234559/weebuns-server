import { Course } from 'src/models/course/entities/course.entity';
import { Lesson } from 'src/models/lesson/entities/lesson.entity';
import { INote } from 'src/models/note/note.interface';
import { Unit } from 'src/models/unit/entities/unit.entity';
import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';
export declare class Note implements INote {
    id: string;
    spaceId: string | null;
    lessonId: string;
    courseId: string | null;
    unitId: string | null;
    title: string;
    content: string;
    tags: string[];
    isBookmarked: boolean;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    lesson?: Lesson;
    creator?: User;
    space?: Space | null;
    Course?: Course | null;
    Unit?: Unit | null;
}
