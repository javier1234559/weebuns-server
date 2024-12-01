import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';
export declare class ExistEntityConstraint implements ValidatorConstraintInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(value: string, args: any): Promise<boolean>;
    defaultMessage(args: any): string;
}
export declare function ExistEntity(entityName: keyof PrismaService, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
