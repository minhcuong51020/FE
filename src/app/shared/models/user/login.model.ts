export interface ILoginRequest {
    username?: string;
    password?: string;
}
  
export class LoginRequest implements ILoginRequest {
    constructor(
      public username?: string,
      public password?: string,
    ) {
      this.username = username;
      this.password = password;
    }
}

export interface ILoginResponse {
    accessToken?: string,
    refreshToken?: string,
    fullName?: string;
    id?: string;
}
  
export class LoginResponse implements ILoginResponse {
    constructor(
      public accessToken?: string,
      public refreshToken?: string,
      public fullName?: string,
      public id?: string,
    ) {
      this.fullName = fullName;
      this.accessToken = accessToken;
      this.id = id;
      this.refreshToken = refreshToken;
    }
}