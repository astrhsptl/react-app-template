import axios, { AxiosRequestConfig } from 'axios';
import { EntityId, QueryParam } from './interfaces';

export class APITemplate {
  private url;

  constructor(url: string) {
    this.url = url;
  }

  async fetchAll<FetchType>(
    queryParams?: QueryParam,
    RequestConfig?: AxiosRequestConfig,
  ) {
    const url = this.compileUrlPath(this.url, queryParams);
    return await axios.get<FetchType>(url, RequestConfig);
  }

  async fetchByID<FetchType>(id: EntityId, RequestConfig?: AxiosRequestConfig) {
    const url = `${this.url}${id}`;
    return await axios.get<FetchType>(url, RequestConfig);
  }

  async create<FetchType, FetchTypeRequest>(
    data: FetchTypeRequest,
    RequestConfig?: AxiosRequestConfig,
  ) {
    return await axios.post<FetchType>(this.url, data, RequestConfig);
  }

  async update<FetchType, FetchTypeRequest>(
    id: EntityId,
    data: FetchTypeRequest,
    RequestConfig?: AxiosRequestConfig,
  ) {
    const url = `${this.url}${id}`;
    return await axios.patch<FetchType>(url, data, RequestConfig);
  }

  async remove<FetchType>(id: EntityId, RequestConfig?: AxiosRequestConfig) {
    const url = `${this.url}${id}`;
    return await axios.delete<FetchType>(url, RequestConfig);
  }

  compileUrlPath(url: string, queryParams?: QueryParam): string {
    if (!queryParams) return url;

    if (Object.keys(queryParams).length > 0) {
      url += '?';
    }

    Object.entries(queryParams).forEach(([qn, qv]) => {
      url += `${qn}=${qv}&`;
    });
    return url;
  }
}
