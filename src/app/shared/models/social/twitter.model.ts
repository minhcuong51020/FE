export interface ITwitter {
    id?: string,
    name?: string,
    consumerKey?: string,
    consumerSecret?: string,
    oauthTokenSecret?: string,
    channelToken?: string,
    createdAt?: Date,
    modifiedAt?: Date,
    deleted?: boolean
}

export class Twitter implements ITwitter {
    constructor(
        public id?: string,
        public name?: string,
        public consumerKey?: string,
        public consumerSecret?: string,
        public oauthToken?: string,
        public oauthTokenSecret?: string,
        public createdAt?: Date,
        public modifiedAt?: Date,
        public deleted?: boolean
    ) {
        this.id = id;
        this.name = name;
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret
        this.oauthToken = oauthToken
        this.oauthTokenSecret = oauthTokenSecret
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.deleted = deleted;
    }
}

export interface ITwitterRequest {
    keyword?: string;
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    hasPageable?: boolean;
}
  
export class TwitterRequest implements ITwitterRequest {
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