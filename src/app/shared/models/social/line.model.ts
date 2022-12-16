export interface ILine {
    id?: string,
    channelName?: string,
    channelToken?: string,
    createdAt?: Date,
    modifiedAt?: Date
}

export class Line implements ILine {
    constructor(
        public id?: string,
        public channelName?: string,
        public channelToken?: string,
        public createdAt?: Date,
        public modifiedAt?: Date
    ) {
        this.id = id;
        this.channelName = channelName;
        this.channelToken = channelToken;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}

export interface ILineRequest {
    keyword?: string;
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    hasPageable?: boolean;
}
  
export class LineRequest implements ILineRequest {
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