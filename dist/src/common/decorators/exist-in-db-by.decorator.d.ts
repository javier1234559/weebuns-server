import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from 'src/common/prisma/prisma.service';
export declare class ExistInDbByConstraint implements ValidatorConstraintInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(value: any, args: ValidationArguments): Promise<boolean>;
    private processWhereConditions;
    defaultMessage(args: ValidationArguments): string;
}
interface ExistInDbByOptions {
    model: string;
    where: Record<string, any>;
}
export declare function ExistInDbBy(options: ExistInDbByOptions, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export {};
