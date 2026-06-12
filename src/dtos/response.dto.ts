export interface IResponse {
    status: ResponseStatus;
    message: string;
    data?: any;
}

export enum ResponseStatus {
    SUCCESS = 'success',
    ERROR = 'error',
}


export class ResponseDto implements IResponse {
    constructor(
        public status: ResponseStatus,
        public message: string,
        public data?: any
    ) { }
}