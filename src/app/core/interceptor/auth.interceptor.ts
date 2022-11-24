import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth/auth.service';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes(`${environment.gateway}${SERVICE.IAM}/login`)) {
      return next.handle(request);
    }
    if(request.url.includes(`${environment.gateway}${SERVICE.IAM}/register`)) {
      return next.handle(request);
    }
    if(request.url.includes(`${environment.gateway}${SERVICE.IAM}/logout`)) {
      return next.handle(request);
    }
    this.authService.loadToken();
    const accessToken = this.authService.getToken();
    const requestClone = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    return next.handle(requestClone);
  }
}
