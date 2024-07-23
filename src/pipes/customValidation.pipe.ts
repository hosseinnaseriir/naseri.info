import { BadRequestException, ValidationError, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
    constructor(options?: ValidationPipeOptions) {
        super(options);
    }

    protected formatValidationErrors(validationErrors: ValidationError[]): { field: string; msg: string }[] {
        return validationErrors.flatMap(error => {
            return Object.values(error.constraints || {}).map(constraint => ({
                field: error.property,
                msg: constraint,
            }));
        });
    }

    createExceptionFactory() {
        return (validationErrors: ValidationError[] = []) => {
            const formattedErrors = this.formatValidationErrors(validationErrors);
            return new BadRequestException({
                msg: 'Validation failed',
                fields: formattedErrors,
            });
        };
    }
}
