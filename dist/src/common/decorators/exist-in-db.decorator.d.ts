import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from 'src/common/prisma/prisma.service';
export declare class ExistInDbConstraint implements ValidatorConstraintInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(value: any, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
interface ExistInDbOptions {
    model: string;
    field?: string;
}
export declare function ExistInDb(options: ExistInDbOptions, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export {};
