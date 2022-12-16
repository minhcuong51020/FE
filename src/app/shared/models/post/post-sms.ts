export interface IPostSms {
    name?: string;
    phone?: string;
    address?: string;
    timeSend?: Date;
}

export class PostSms implements IPostSms {
    constructor(
        public name?: string,
        public phone?: string,
        public address?: string,
        public timeSend?: Date,
    ) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.timeSend = timeSend;
    }
}