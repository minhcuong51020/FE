import { EntityResponseType } from './../common/abstract.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { IPostRequest, IPosts } from '@shared/models/post/posts.model';
import { AbstractService } from '../common/abstract.service';
import { IFileResponse } from '@shared/models/post/file.models';
import { IPostRedditRequest } from '@shared/models/post/post-reddit.model';
import { IPostUserInfoRequest } from '@shared/models/post/post-user-info.models';
import { IPostLine } from '@shared/models/post/post-line.model';
import { IPostTwitter } from '@shared/models/post/post-twitter.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends AbstractService {

  private host = SERVICE.POSTS + "/posts";

  private hostSend = SERVICE.POSTS + "/send"

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  // Crud Posts
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

  //Send Reddit
  public sendReddit(
    postRedditRequest: IPostRedditRequest,
    loading = true
  ): Observable<EntityResponseType<any>> {
    return super.post<any>(`${this.hostSend}/reddit`, postRedditRequest, {
      loading
    })
  }

  //Send Email Or Sms
  public sendEmail(
    postUserInfoRequest: IPostUserInfoRequest,
    loading = true
  ): Observable<EntityResponseType<any>> {
    return super.post<any>(`${this.hostSend}/email`, postUserInfoRequest, {
      loading
    })
  }

  public sendSms(
    postUserInfoRequest: IPostUserInfoRequest,
    loading = true
  ): Observable<EntityResponseType<any>> {
    return super.post<any>(`${this.hostSend}/sms`, postUserInfoRequest, {
      loading
    })
  }

  public sendLine(
    postLine: IPostLine,
    loading = true
  ): Observable<EntityResponseType<any>> {
    return super.post<any>(`${this.hostSend}/line`, postLine, {
      loading
    })
  }

  public sendTwitter(
    postTwitter: IPostTwitter,
    loading = true
  ): Observable<EntityResponseType<any>> {
    return super.post<any>(`${this.hostSend}/twitter`, postTwitter, {
      loading
    })
  }
  
}
