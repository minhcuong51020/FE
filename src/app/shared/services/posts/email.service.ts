import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { IEmail, IEmailRequest } from '@shared/models/post/email.models';
import { Observable } from 'rxjs';
import { AbstractService, EntityResponseType } from '../common/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService extends AbstractService {

  private host = SERVICE.POSTS + "/email";

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  // Crud Posts
  public create(
    email: IEmail,
    loading = true
  ): Observable<EntityResponseType<IEmail>> {
    return super.post<IEmail>(`${this.host}`, email, {
      loading
    })
  }

  public update(
    email: IEmail,
    id: string,
    loading = true
  ): Observable<EntityResponseType<IEmail>> {
    return super.post<IEmail>(`${this.host}/${id}/update`, email, {
      loading
    })
  }

  public delete(
    id: string,
    loading = true
  ): Observable<EntityResponseType<IEmail>> {
    return super.post<IEmail>(`${this.host}/${id}/delete`, {
      loading
    })
  }

  public detail(
    id: string,
    loading = true
  ): Observable<EntityResponseType<IEmail>> {
    return super.get<IEmail>(`${this.host}/${id}/detail`, {
      loading
    })
  }

  public search(
    params: IEmailRequest,
    loading = true
  ): Observable<EntityResponseType<IEmail[]>> {
    return super.get<IEmail[]>(`${this.host}`, {
      params,
      loading
    })
  }
  
}
