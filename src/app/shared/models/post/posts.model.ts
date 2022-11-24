export interface IPosts {
    id?: string;
    title?: string;
    content?: string;
    ownerId?: string;
    createdAt?: Date;
}

export class Posts implements IPosts {
    constructor(
        public id: string,
        public title: string,
        public content: string,
        public createdAt: Date,
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
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