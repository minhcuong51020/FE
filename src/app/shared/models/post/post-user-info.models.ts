export enum TypePostUserInfo {
    EMAIL = "EMAIL",
    SMS = "SMS"
}

export interface IPostUserInfoRequest {
    postId?: string;
    userInfoIds?: string[];
    type?: TypePostUserInfo
}

export class PostUserInfoRequest implements IPostUserInfoRequest {
    constructor(
        public postId?: string,
        public userInfoIds?: string[],
        public type?: TypePostUserInfo
    ) {
        this.postId = postId;
        this.userInfoIds = userInfoIds;
        this.type = type;
    }
}

export interface IPostEmailResponse {
    id?: string;
    name?: string;
    email?: string;
    address?: string;
    timeSendEmail?: Date;
}

export class PostEmailResponse implements IPostEmailResponse {
    constructor(
        public id?: string,
        public name?: string,
        public email?: string,
        public address?: string,
        public timeSendEmail?: Date
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.timeSendEmail = timeSendEmail;
    }
}

export interface IPostSmsResponse {
    id?: string;
    name?: string;
    phone?: string;
    address?: string;
    timeSendEmail?: Date;
}

export class PostSmsResponse implements IPostSmsResponse {
    constructor(
        public id?: string,
        public name?: string,
        public phone?: string,
        public address?: string,
        public timeSendEmail?: Date
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.timeSendEmail = timeSendEmail;
    }
}