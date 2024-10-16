import { Essay } from 'src/models/essay/entities/essay.entity';
import { ISpace } from 'src/models/space/space.interface';
import { User } from 'src/models/user/entities/user.entity';

export class Space implements ISpace {
  id: number;
  name: string;
  description: string | null;
  essay_number: number | null;
  quiz_number: number | null;
  vocab_number: number | null;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  user?: User;
  essays?: Essay[];
}
