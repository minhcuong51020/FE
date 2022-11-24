export interface IClientInfo {
    id?: string;
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    ownerId?: string;
}
  
export class ClientInfo implements IClientInfo {
    constructor(
      public id?: string,
      public name?: string,
      public address?: string,
      public phone?: string,
      public email?: string,
      public ownerId?: string
    ) {
      this.id = id;
      this.name = name;
      this.address = address;
      this.phone = phone;
      this.email = email;
      this.ownerId = ownerId;
    }
}

export interface IClientInfoRequest {
    keyword?: string;
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    hasPageable?: boolean;
}
  
  export class ClientInfoRequest implements IClientInfoRequest {
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
  