import { IPageable } from '../interface/pageable.interface';

export interface IBaseResponse<T> {
  success?: boolean;
  code?: number | string;
  data?: T;
  message?: string;
  page?: IPageable;
  timestamp?: string | number | any;
}
