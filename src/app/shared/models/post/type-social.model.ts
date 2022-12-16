export enum TypePostSocial {
    TWITTER = 'TWITTER',
    LINE = 'LINE'
}

export interface IPostSocial {
    typePostSocial?: string;
    accountName?: string;
    timeSend?: Date;
}

export class PostSocial implements IPostSocial {
    constructor(
        public typePostSocial?: string,
        public accountName?: string,
        public timeSend?: Date
    ) {
        this.typePostSocial = typePostSocial;
        this.accountName = accountName;
        this.timeSend = timeSend;
    }
}