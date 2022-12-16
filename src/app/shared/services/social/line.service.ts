import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { ILine, ILineRequest } from '@shared/models/social/line.model';
import { Observable } from 'rxjs';
import { AbstractService, EntityResponseType } from '../common/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class LineService extends AbstractService {

  private host = SERVICE.SOCIAL + "/line";

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  public create(
    line: ILine,
    loading = true
  ): Observable<EntityResponseType<ILine>> {
    return super.post<ILine>(`${this.host}`, line, {
      loading
    })
  }

  public update(
    line: ILine,
    id: string,
    loading = true
  ): Observable<EntityResponseType<ILine>> {
    return super.post<ILine>(`${this.host}/${id}/update`, line, {
      loading
    })
  }

  public delete(
    id: string,
    loading = true
  ): Observable<EntityResponseType<ILine>> {
    return super.post<ILine>(`${this.host}/${id}/delete`, {
      loading
    })
  }

  public detail(
    id: string,
    loading = true
  ): Observable<EntityResponseType<ILine>> {
    return super.get<ILine>(`${this.host}/${id}/detail`, {
      loading
    })
  }

  public search(
    params: ILineRequest,
    loading = true
  ): Observable<EntityResponseType<ILine[]>> {
    return super.get<ILine[]>(`${this.host}`, {
      params,
      loading
    })
  }
}
