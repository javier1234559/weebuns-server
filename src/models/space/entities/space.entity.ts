import { ISpace } from 'src/models/space/space.interface';

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
  // user?: User;
  // essays?: Essay[];
}
