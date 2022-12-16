import { IPostEmail } from "./post-email";
import { IPostRedditResponse } from "./post-reddit.model";
import { PostSms } from "./post-sms";
import { IPostSocial } from "./type-social.model";

export interface IPosts {
    id?: string;
    title?: string;
    content?: string;
    ownerId?: string;
    createdAt?: Date;
    postEmailResponses?: IPostEmail[];
    postSmsResponses?: PostSms[];
    postRedditResponses?: IPostRedditResponse[];
    postSocialResponses?: IPostSocial[];
}

export class Posts implements IPosts {
    constructor(
        public id?: string,
        public title?: string,
        public content?: string,
        public createdAt?: Date,
        public postEmailResponses?: IPostEmail[],
        public postSmsResponses?: PostSms[],
        public postRedditResponses?: IPostRedditResponse[],
        public postSocialResponses?: IPostSocial[],
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.postEmailResponses = postEmailResponses;
        this.postRedditResponses = postRedditResponses;
        this.postSmsResponses = postSmsResponses;
        this.postSocialResponses = postSocialResponses;
    }
}
export interface IPostRequest {
    keyword?: string;
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    hasPageable?: boolean;
}
  
export class PostRequest implements IPostRequest {
    constructor(
        public keyword?: string,
        public pageIndex?: number,
        public pageSize?: number,
        public sortBy?: string,
        public hasPageable?: boolean
    ) {
        this.keyword = keyword;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.sortBy = sortBy;
        this.hasPageable = hasPageable;
    }
}