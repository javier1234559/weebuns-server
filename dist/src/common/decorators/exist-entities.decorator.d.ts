import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';
export declare class ExistEntitiesConstraint implements ValidatorConstraintInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(values: string[], args: any): Promise<boolean>;
    defaultMessage(args: any): string;
}
export declare function ExistEntities(entityName: keyof PrismaService, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
