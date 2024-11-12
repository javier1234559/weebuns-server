import { Space as PrismaSpace } from '@prisma/client';

export interface ISpace extends PrismaSpace {
  _count?: {
    essays: number;
    notes: number;
    vocabularies: number;
  };
}
