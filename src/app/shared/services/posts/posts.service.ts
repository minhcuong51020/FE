import { EntityResponseType } from './../common/abstract.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { IPostRequest, IPosts } from '@shared/models/post/posts.model';
import { AbstractService } from '../common/abstract.service';
import { IFileResponse } from '@shared/models/post/file.models';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends AbstractService {

  private host = SERVICE.POSTS + "/posts";

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  public create(
    posts: IPosts,
    loading = true
  ): Observable<EntityResponseType<IPosts>> {
    return super.post<IPosts>(`${this.host}`, posts, {
      loading
    })
  }

  public update(
    posts: IPosts,
    id: string,
    loading = true
  ): Observable<EntityResponseType<IPosts>> {
    return super.post<IPosts>(`${this.host}/${id}/update`, posts, {
      loading
    })
  }

  public delete(
    id: string,
    loading = true
  ): Observable<EntityResponseType<IPosts>> {
    return super.post<IPosts>(`${this.host}/${id}/delete`, {
      loading
    })
  }

  public detail(
    id: string,
    loading = true
  ): Observable<EntityResponseType<IPosts>> {
    return super.get<IPosts>(`${this.host}/${id}/detail`, {
      loading
    })
  }

  public search(
    params: IPostRequest,
    loading = true
  ): Observable<EntityResponseType<IPosts[]>> {
    return super.get<IPosts[]>(`${this.host}`, {
      params,
      loading
    })
  }

  public uploadFile(
    param: FormData,
    loading = true
  ): Observable<EntityResponseType<IFileResponse>> {
    return super.post<IFileResponse>(`${this.host}/upload`, param, {
      loading
    })
  }
  
}
