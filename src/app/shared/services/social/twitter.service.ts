import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { ITwitter, ITwitterRequest } from '@shared/models/social/twitter.model';
import { Observable } from 'rxjs';
import { AbstractService, EntityResponseType } from '../common/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class TwitterService extends AbstractService {

  private host = SERVICE.SOCIAL + "/twitter";

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  public create(
    twitter: ITwitter,
    loading = true
  ): Observable<EntityResponseType<ITwitter>> {
    return super.post<ITwitter>(`${this.host}`, twitter, {
      loading
    })
  }

  public update(
    twitter: ITwitter,
    id: string,
    loading = true
  ): Observable<EntityResponseType<ITwitter>> {
    return super.post<ITwitter>(`${this.host}/${id}/update`, twitter, {
      loading
    })
  }

  public delete(
    id: string,
    loading = true
  ): Observable<EntityResponseType<ITwitter>> {
    return super.post<ITwitter>(`${this.host}/${id}/delete`, {
      loading
    })
  }

  public detail(
    id: string,
    loading = true
  ): Observable<EntityResponseType<ITwitter>> {
    return super.get<ITwitter>(`${this.host}/${id}/detail`, {
      loading
    })
  }

  public search(
    params: ITwitterRequest,
    loading = true
  ): Observable<EntityResponseType<ITwitter[]>> {
    return super.get<ITwitter[]>(`${this.host}`, {
      params,
      loading
    })
  }

}
