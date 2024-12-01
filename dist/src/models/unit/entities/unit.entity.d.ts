import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';
import { Course } from 'src/models/course/entities/course.entity';
import { Lesson } from 'src/models/lesson/entities/lesson.entity';
import { IUnit } from 'src/models/unit/unit.interface';
import { User } from 'src/models/user/entities/user.entity';
export declare class Unit implements IUnit {
    id: string;
    courseId: string;
    title: string;
    orderIndex: number;
    isPremium: boolean;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    course?: Course;
    creator?: User;
    lessons?: Lesson[];
    courseProgress?: CourseProgress[];
    nextUnits?: CourseProgress[];
}
