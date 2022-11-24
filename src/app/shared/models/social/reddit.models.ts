export interface IReddit {
    id?: string,
    username?: string,
    password?: string,
    clientId?: string,
    clientSecret?: string,
    displayName?: string,
    createdAt?: Date,
    modifiedAt?: Date
}

export class Reddit implements IReddit {
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public clientId: string,
        public clientSecret: string,
        public displayName: string,
        public createdAt: Date,
        public modifiedAt: Date
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.displayName = displayName;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}

export interface IRedditGroup {
    id?: string,
    name?: string,
    nameUrl?: string,
    description?: string,
    ownerId?: string,
    createdAt?: Date,
    modifiedAt?: Date
}

export class RedditGroup implements IRedditGroup {
    constructor(
        public id?: string,
        public name?: string,
        public nameUrl?: string,
        public description?: string,
        public ownerId?: string,
        public createdAt?: Date,
        public modifiedAt?: Date
    ) {
        this.id = id;
        this.name = name;
        this.nameUrl = nameUrl;
        this.description = description;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.ownerId = ownerId;
    }
}

export interface IRedditGroupRequest {
    keyword?: string;
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    hasPageable?: boolean;
}
  
export class RedditGroupRequest implements IRedditGroupRequest {
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

