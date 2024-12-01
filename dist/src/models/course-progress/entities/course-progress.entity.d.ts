import { ICourseProgress } from 'src/models/course-progress/course-progress.interface';
import { Course } from '../../course/entities/course.entity';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { Unit } from '../../unit/entities/unit.entity';
import { User } from '../../user/entities/user.entity';
export declare class CourseProgress implements ICourseProgress {
    completedWeight: number;
    id: string;
    userId: string;
    courseId: string;
    currentUnitId: string | null;
    currentLessonId: string | null;
    nextUnitId: string | null;
    nextLessonId: string | null;
    lastAccessedAt: Date | null;
    completedUnits: string[];
    completedLessons: string[];
    user?: User;
    course?: Course;
    currentUnit?: Unit | null;
    nextUnit?: Unit | null;
    currentLesson?: Lesson | null;
    nextLesson?: Lesson | null;
}
