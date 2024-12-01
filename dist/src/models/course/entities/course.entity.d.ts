import { ContentStatus } from '@prisma/client';
import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';
import { ICourse } from 'src/models/course/course.interface';
import { SpaceCourse } from 'src/models/space-course/entities/space-course.entity';
import { Unit } from 'src/models/unit/entities/unit.entity';
import { User } from 'src/models/user/entities/user.entity';
export declare class Course implements ICourse {
    totalWeight: number;
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
    status: ContentStatus;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    creator?: User;
    units?: Unit[];
    progress?: CourseProgress[];
    spaces?: SpaceCourse[];
}
