import { Prisma } from '@prisma/client';
export declare class CreateReferenceDataDto {
    type: string;
    code: string;
    name: string;
    metadata?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
}
