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

  public register(user: IUser): Observable<EntityResponseType<any>> {
    return super.post<EntityResponseType<any>>(`${this.host}/register`, user, {
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

}
