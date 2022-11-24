import { IClientInfoRequest } from './../../models/client-info/client-info.model';
import { Observable } from 'rxjs';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IClientInfo } from '@shared/models/client-info/client-info.model';
import { AbstractService, EntityResponseType } from '../common/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService extends AbstractService {

  private baseURL = SERVICE.POSTS + "/user-info";

  constructor(protected http: HttpClient) {
    super(http);
  }

  create(
    clientInfo: IClientInfo,
    loading = true
  ): Observable<EntityResponseType<IClientInfo>> {
    return super.post<IClientInfo>(`${this.baseURL}`, clientInfo, {
      loading
    });
  }

  update(
    clientInfo: IClientInfo,
    id?: string,
    loading = true
  ): Observable<EntityResponseType<IClientInfo>> {
    return super.post<IClientInfo>(`${this.baseURL}/${id}/update`, clientInfo, {
      loading
    });
  }

  delete(id?: string, loading = true): Observable<EntityResponseType<IClientInfo>> {
    return super.post<IClientInfo>(`${this.baseURL}/${id}/delete`, {
      loading
    });
  }

  search(
    params?: IClientInfoRequest,
    loading = true
  ): Observable<EntityResponseType<IClientInfo[]>> {
    return super.get<IClientInfo[]>(`${this.baseURL}`, {
      params,
      loading,
    });
  }

  findById(
    id?: string,
    loading = true
  ): Observable<EntityResponseType<IClientInfo>> {
    return super.get<IClientInfo>(`${this.baseURL}${id}/detail`, {
      loading,
    });
  }

}
