import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "./exceptions";

export class Validator {
    constructor() { }

    private getErrors(errors: ValidationError[]): string[] {
        return errors.flatMap(error => {
            if (error.constraints) {
                return Object.values(error.constraints);
            }
            // Handle nested errors
            if (error.children && error.children.length > 0) {
                return this.getErrors(error.children);
            }
            return [];
        });
    }

    validate(schema: any, source: 'body' | 'query' | 'params' = 'body'): (request: Request, response: Response, next: NextFunction) => Promise<void> {
        return async (request: Request, response: Response, next: NextFunction) => {
            validate(plainToInstance(schema, request[source]), { skipMissingProperties: true, whitelist: true, forbidNonWhitelisted: true }).then(errors => {
                if (errors.length > 0) {
                    const errorArray = this.getErrors(errors);
                    const errorString = errorArray.join(', ');
                    throw new BadRequestException(errorString);
                }
                next();
            });
        };
    }

}