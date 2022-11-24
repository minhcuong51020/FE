import {
  AbstractService,
  EntityResponseType
} from '../common/abstract.service';
import { environment } from './../../../../environments/environment';
import { ILoginRequest, ILoginResponse } from './../../models/user/login.model';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { JwtHelperService} from '@auth0/angular-jwt';
import {Observable, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {
  LOCAL_STORAGE,
  SESSION_STORAGE
} from '../../constants/local-session-cookies.constants';
import {ToastService} from '../helpers/toast.service';
import { IUser } from '@shared/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AbstractService {
  public currentUser: any;
  public host = SERVICE.IAM;
  private loggedInUsername = '';
  private loggedInFullName!: string | null;
  public userId!: string | null;
  private token!: string | null;
  private jwtHelper = new JwtHelperService();

  constructor(
    protected http: HttpClient,
    private translateService: TranslateService,
    private router: Router,
    protected toast: ToastService
  ) {
    super(http)
  }

  public login(login: ILoginRequest,
    loading = true): Observable<EntityResponseType<ILoginResponse>> {
    return super.post<ILoginResponse>(`${this.host}/login`, login, {
      loading
    });
  }

  public register(user: IUser): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.host}/register`, user, {
      observe: 'response'
    });
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if(this.token !== null && this.token !== '') {
      if(this.jwtHelper.decodeToken(this.token).sub !== null || '') {
        if(!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }
    this.logout();
    return false;
  }

  public logout(): void {
    this.token = '';
    this.loggedInUsername = '';
    this.loggedInFullName = '';
    this.userId = '';
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('fullName');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  public getToken(): string | null {
    return this.token;
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public saveUserId(userId: string): void {
    localStorage.setItem('userId', userId);
    this.userId = localStorage.getItem('userId');
  }

  public getUserId(): string | null {
    return this.userId;
  }

  public loadUserId(): void {
    this.userId = localStorage.getItem('userId');
  }

  public savefullName(fullName: string): void {
    this.loggedInFullName = fullName;
    localStorage.setItem('fullName', this.loggedInFullName);
  }

  public getfullName(): string | null {
    return this.loggedInFullName;
  }

  public loadfullName(): void {
    this.loggedInFullName = localStorage.getItem('fullName');
  }

  // storeProfile(redirectUrl?: string, isShowToast = true): void {
  //   this.myProfile().subscribe((response) => {
  //     const currentUser = response?.body?.data as User;
  //     this.currentUser = currentUser;
  //     if (currentUser.accountType === USER_CUSTOMER) {
  //       this.clear();
  //       this.toast.info('model.login.error.permissionNotAccess');
  //     } else {
  //       if (isShowToast) {
  //         this.toast.success(
  //           this.translateService.instant('model.login.success.authenticate')
  //         );
  //       }
  //       this.$localStorage.store(LOCAL_STORAGE.PROFILE, currentUser);
  //       this.myAuthorities().subscribe((res) => {
  //         currentUser.userPrimary = res.body?.data as UserPrimary;
  //         this.currentUser = currentUser;
  //         this.$localStorage.store(LOCAL_STORAGE.PROFILE, currentUser);
  //         if (redirectUrl) {
  //           this.router.navigate([`${redirectUrl}`]);
  //         }
  //       });
  //     }
  //   });
  // }

  // login(
  //   username: string,
  //   password: string,
  // ): Observable<any> {
  //   return this.http
  //     .post<any>(
  //       `http://localhost:8081/api/user/login`,
  //       {
  //         username,
  //         password,
  //       },
  //       {
  //         observe: 'response',
  //         headers: CommonUtil.headers(true),
  //       }
  //     )
  // }

  // logout(): void {
  //   const url = `${API_IAM}/logout`;
  //   let logoutRevokeRequest = {};
  //   const refreshToken = this.$localStorage.retrieve(
  //     LOCAL_STORAGE.REFRESH_TOKEN
  //   );
  //   if (refreshToken) {
  //     logoutRevokeRequest = {
  //       refreshToken,
  //     };
  //   }
  // }

  // authenticateSuccess(rememberMe: boolean, response: any): void {
  //   const accessToken = response?.data?.accessToken;
  //   const refreshToken = response?.data?.refreshToken;
  //   const isSuccess = response?.success;
  //   const decoder: any = jwt_decode(accessToken);
  //   // get user id from jwt token
  //   this.tokenPrivateKey = decoder?.user_id;
  //   if (!isSuccess) {
  //     this.toast.error(
  //       this.translateService.instant('model.login.error.unauthorized')
  //     );
  //     this.router.navigate(['/authentication/login']);
  //   } else {
  //     if (!!refreshToken) {
  //       const endCodeRefreshToken = CommonUtil.encryptMessage(
  //         refreshToken,
  //         this.getTokenPrivateKey()
  //       );
  //       this.$localStorage.store(
  //         LOCAL_STORAGE.REFRESH_TOKEN,
  //         endCodeRefreshToken
  //       );
  //     }
  //     if (accessToken) {
  //       this.storeAuthenticationToken(accessToken, rememberMe);
  //       return accessToken;
  //     }
  //   }
  // }

  // storeAuthenticationToken(jwt: any, rememberMe: boolean): void {
  //   const endCodeAccessToken = CommonUtil.encryptMessage(
  //     jwt,
  //     this.getTokenPrivateKey()
  //   );
  //   if (rememberMe) {
  //     this.$localStorage.store(LOCAL_STORAGE.JWT_TOKEN, endCodeAccessToken);
  //   } else {
  //     this.$sessionStorage.store(SESSION_STORAGE.JWT_TOKEN, endCodeAccessToken);
  //   }
  // }

  // clear(): void {
  //   this.$localStorage.clear(LOCAL_STORAGE.PROFILE);
  //   this.$localStorage.clear(LOCAL_STORAGE.ROLE);
  //   this.$sessionStorage.clear(SESSION_STORAGE.JWT_TOKEN);
  //   this.$localStorage.clear(LOCAL_STORAGE.REFRESH_TOKEN);
  // }

  // getCurrentUser(): User | null {
  //   const user: User = this.$localStorage.retrieve(LOCAL_STORAGE.PROFILE);
  //   return user ? user : null;
  // }

  // hasAnyAuthority(authorities: string[]): boolean {
  //   this.currentUser = this.getCurrentUser();
  //   if (this.currentUser?.userPrimary?.isRoot) {
  //     return true;
  //   }
  //   let grantedPermissions = [];
  //   if (this.currentUser) {
  //     grantedPermissions = this.currentUser?.userPrimary?.grantedPermissions;
  //     if (grantedPermissions) {
  //       for (let i = 0; i < grantedPermissions?.length; i++) {
  //         if (grantedPermissions.includes(authorities[i])) {
  //           return true;
  //         }
  //       }
  //     }
  //   }
  //   return false;
  // }

  // hasPermissionAccess(authorities: string[], userLevel?: string[]): void {
  //   if (!!userLevel && userLevel?.length > 0) {
  //     this.currentUser = this.getCurrentUser();
  //     if (
  //       !userLevel.includes(this.currentUser?.userPrimary?.userLevel) &&
  //       !this.currentUser?.isRoot
  //     ) {
  //       window.history.back();
  //     }
  //   }
  //   const hasAnyAuthority = this.hasAnyAuthority(authorities);
  //   if (!hasAnyAuthority) {
  //     window.history.back();
  //   }
  // }

  // hasUserLevelAccess(userLevels: string[]): boolean {
  //   this.currentUser = this.getCurrentUser();
  //   const currentUserLevel = this.getCurrentUser()?.userPrimary
  //     ?.userLevel as string;
  //   return !(
  //     !userLevels.includes(currentUserLevel) && !this.currentUser?.isRoot
  //   );
  // }

  // getToken(): string {
  //   const accessTokenEncode =
  //     this.$localStorage.retrieve(LOCAL_STORAGE.JWT_TOKEN) ||
  //     this.$sessionStorage.retrieve(SESSION_STORAGE.JWT_TOKEN);
  //   return CommonUtil.decryptMessage(
  //     accessTokenEncode,
  //     this.getTokenPrivateKey()
  //   );
  // }

  // refreshToken(refreshToken: any): Observable<any> {
  //   return this.http
  //     .post<any>(
  //       `${API_IAM}/refresh-token`,
  //       {refreshToken},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${refreshToken}`,
  //         },
  //       }
  //     )
  //     .pipe(
  //       tap(
  //         (res) => {
  //           const endCodeRefreshToken = CommonUtil.encryptMessage(
  //             res?.data?.refreshToken,
  //             this.getTokenPrivateKey()
  //           );
  //           this.$localStorage.store(
  //             LOCAL_STORAGE.REFRESH_TOKEN,
  //             endCodeRefreshToken
  //           );
  //           this.storeAuthenticationToken(res?.data?.accessToken, true);
  //         },
  //         (err) => throwError(err)
  //       )
  //     );
  // }

  // resetPassword(
  //   userId: string,
  //   newPassword: string,
  //   oldPassword: string,
  //   refreshToken: string
  // ): Observable<any> {
  //   return this.http.post<any>(`${API_IAM}/user/${userId}/change-password`, {
  //     newPassword,
  //     oldPassword,
  //     refreshToken,
  //   });
  // }

  // getTokenPrivateKey(): string {
  //   let tokenPrivateKey = '';
  //   if (!this.tokenPrivateKey) {
  //     // nếu không có key tồn tại thì lấy key từ userProfile local storage
  //     console.error('Token private key is not defined');
  //     const user = this.getCurrentUser();
  //     if (user) {
  //       tokenPrivateKey = user.id as string;
  //       this.tokenPrivateKey = tokenPrivateKey;
  //     } else {
  //       // nếu trong local storage không có user thì xoá hết thông tin profile
  //       console.warn('User is not defined');
  //       this.clear();
  //     }
  //   } else {
  //     tokenPrivateKey = this.tokenPrivateKey;
  //   }
  //   return tokenPrivateKey;
  // }

  // public storeToken(accessToken?: string, refreshToken?: string): void {
  //   if (!!refreshToken) {
  //     const endCodeRefreshToken = CommonUtil.encryptMessage(
  //       refreshToken,
  //       this.getTokenPrivateKey()
  //     );
  //     this.$localStorage.store(
  //       LOCAL_STORAGE.REFRESH_TOKEN,
  //       endCodeRefreshToken
  //     );
  //   }
  //   if (accessToken) {
  //     this.storeAuthenticationToken(accessToken, true);
  //   }
  // }

}
