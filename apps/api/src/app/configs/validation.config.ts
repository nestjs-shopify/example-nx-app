import { ValidatorOptions } from 'class-validator';

import { HttpStatus } from '@nestjs/common';

export const ValidationConfig: ValidatorOptions | Record<string, unknown> = {
    whitelist: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    forbidNonWhitelisted: true,
    disableErrorMessages: false,
    skipMissingProperties: false,
};
