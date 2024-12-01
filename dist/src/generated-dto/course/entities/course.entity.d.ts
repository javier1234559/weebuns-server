import { ContentStatus } from '@prisma/client';
import { CourseProgress } from '../../course-progress/entities/course-progress.entity';
import { Note } from '../../note/entities/note.entity';
import { SpaceCourse } from '../../space-course/entities/space-course.entity';
import { Unit } from '../../unit/entities/unit.entity';
import { User } from '../../user/entities/user.entity';
export declare class Course {
    id: string;
    title: string;
    description: string | null;
    thumbnailUrl: string | null;
    language: string;
    minLevel: string;
    maxLevel: string;
    topics: string[];
    courseType: string;
    isPremium: boolean;
    totalWeight: number | null;
    status: ContentStatus;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    creator?: User;
    units?: Unit[];
    progress?: CourseProgress[];
    spaces?: SpaceCourse[];
    Note?: Note[];
}
