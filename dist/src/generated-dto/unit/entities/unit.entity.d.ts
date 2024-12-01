import { CourseProgress } from '../../course-progress/entities/course-progress.entity';
import { Course } from '../../course/entities/course.entity';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { Note } from '../../note/entities/note.entity';
import { User } from '../../user/entities/user.entity';
export declare class Unit {
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
    Note?: Note[];
}
