export interface IUser {
    id?: string;
    username?: string;
    password?: string;
    fullName?: string;
}
  
export class User implements IUser {
    constructor(
      public id?: string,
      public username?: string,
      public password?: string,
      public fullName?: string,
    ) {
      this.id = id;
      this.fullName = fullName;
      this.password = password;
      this.fullName = fullName;
    }
}