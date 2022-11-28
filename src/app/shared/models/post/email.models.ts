export interface IEmail {
    id?: string;
    email?: string;
    password?: string;
    ownerId?: string;
    createdAt?: Date;
    modifiedAt?: Date;
}

export class Email implements IEmail {
    constructor(
        public id?: string,
        public email?: string,
        public password?: string,
        public ownerId?: string,
        public modifiedAt?: Date,
        public createdAt?: Date,
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
export interface IEmailRequest {
    keyword?: string;
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    hasPageable?: boolean;
}
  
export class EmailRequest implements IEmailRequest {
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