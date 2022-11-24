import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { IRedditGroup, IRedditGroupRequest } from '@shared/models/social/reddit.models';
import { Observable } from 'rxjs';
import { AbstractService, EntityResponseType } from '../common/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class RedditServiceService extends AbstractService {

  private hostReddit = SERVICE.SOCIAL + "/reddit";

  private hostRedditGroup = SERVICE.SOCIAL + "/reddit-group";

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  public createRedditGroup(
    group: IRedditGroup,
    loading = true
  ): Observable<EntityResponseType<IRedditGroup>> {
    return super.post<IRedditGroup>(`${this.hostRedditGroup}`, group, {
      loading
    })
  }

  public updateRedditGroup(
    group: IRedditGroup,
    id: string,
    loading = true
  ): Observable<EntityResponseType<IRedditGroup>> {
    return super.post<IRedditGroup>(`${this.hostRedditGroup}/${id}/update`, group, {
      loading
    })
  }

  public deleteRedditGroup(
    id: string,
    loading = true
  ): Observable<EntityResponseType<IRedditGroup>> {
    return super.post<IRedditGroup>(`${this.hostRedditGroup}/${id}/delete`, {
      loading
    })
  }

  public detail(
    id: string,
    loading = true
  ): Observable<EntityResponseType<IRedditGroup>> {
    return super.get<IRedditGroup>(`${this.hostRedditGroup}/${id}/detail`, {
      loading
    })
  }

  public searchRedditGroup(
    params: IRedditGroupRequest,
    loading = true
  ): Observable<EntityResponseType<IRedditGroup[]>> {
    return super.get<IRedditGroup[]>(`${this.hostRedditGroup}`, {
      params,
      loading
    })
  }
}
