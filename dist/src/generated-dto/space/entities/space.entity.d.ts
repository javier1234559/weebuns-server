import { Essay } from '../../essay/entities/essay.entity';
import { Note } from '../../note/entities/note.entity';
import { SpaceCourse } from '../../space-course/entities/space-course.entity';
import { User } from '../../user/entities/user.entity';
import { Vocabulary } from '../../vocabulary/entities/vocabulary.entity';
export declare class Space {
    id: string;
    name: string;
    description: string | null;
    language: string;
    target: string;
    currentLevel: string;
    topics: string[];
    targetLevel: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    creator?: User;
    essays?: Essay[];
    vocabularies?: Vocabulary[];
    notes?: Note[];
    courses?: SpaceCourse[];
}
