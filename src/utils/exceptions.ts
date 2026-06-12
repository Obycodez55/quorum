import { HttpStatus } from "./http-enum";

export abstract class BaseException extends Error {
    status?: number;
    reason?: string;
  
    constructor(message: string) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
    }
  }

export class HttpException extends BaseException{

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export class InternalServerException extends BaseException {
    constructor(message: string) {
        super(message);
        this.status = 500;
        this.reason = 'Internal Server Error';
    }
}

export class NotFoundException extends BaseException {
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.NOT_FOUND;
        this.reason = 'Not Found';
    }
}

export class BadRequestException extends BaseException{
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.BAD_REQUEST;
        this.reason = 'Bad Request';
    }
}

export class UnauthorizedException extends BaseException{
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.UNAUTHORIZED;
        this.reason = 'Unauthorized';
    }
}

export class ForbiddenException extends BaseException{
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.FORBIDDEN;
        this.reason = 'Forbidden';
    }
}

export class ConflictException extends BaseException{
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.CONFLICT;
        this.reason = 'Conflict';
    }
}