import { Course } from '../../course/entities/course.entity';
import { Space } from '../../space/entities/space.entity';
export declare class SpaceCourse {
    id: string;
    spaceId: string;
    courseId: string;
    joinedAt: Date;
    space?: Space;
    course?: Course;
}
