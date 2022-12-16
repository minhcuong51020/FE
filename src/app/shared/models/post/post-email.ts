export interface IPostEmail {
    name?: string;
    email?: string;
    address?: string;
    timeSend?: Date;
}

export class PostEmail implements IPostEmail {
    constructor(
        public name?: string,
        public email?: string,
        public address?: string,
        public timeSend?: Date,
    ) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.timeSend = timeSend;
    }
}