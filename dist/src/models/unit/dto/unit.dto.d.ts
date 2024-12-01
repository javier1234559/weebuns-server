import { Prisma } from '@prisma/client';
export declare class UnitDto {
    id: string;
    title: string;
    description: string | null;
    orderIndex: number;
    comments: Prisma.JsonValue;
    createdAt: Date;
    updatedAt: Date;
}
