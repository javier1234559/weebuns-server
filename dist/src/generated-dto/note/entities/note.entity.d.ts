import { Course } from '../../course/entities/course.entity';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { Space } from '../../space/entities/space.entity';
import { Unit } from '../../unit/entities/unit.entity';
import { User } from '../../user/entities/user.entity';
export declare class Note {
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
    course?: Course | null;
    unit?: Unit | null;
}
