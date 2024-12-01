import { Prisma } from '@prisma/client';
export declare class ReferenceData {
    id: string;
    type: string;
    code: string;
    name: string;
    metadata: Prisma.JsonValue | null;
    isActive: boolean;
    orderIndex: number;
    createdAt: Date;
    updatedAt: Date;
}
