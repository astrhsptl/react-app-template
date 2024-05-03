import { API_SERVER_URL } from '@/shared';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CSI } from '..';
import { EntityId, PaginatedResult } from './interfaces';

const DefaultTriesCount = 2;

export class APITemplate<FetchType, RequestType> {
  private url;
  constructor(url: string) {
    this.url = `${API_SERVER_URL}/api/${url}/`;
  }

  async fetchAll(
    RequestConfig: AxiosRequestConfig = {},
    tries: number = DefaultTriesCount,
  ): Promise<AxiosResponse<PaginatedResult<FetchType>>> {
    return await axios
      .get<
        PaginatedResult<FetchType>
      >(this.url, this.setAuthenticationHeader(RequestConfig))
      .catch(() => {
        if (tries === 0) {
          throw new Error(`Item ${this.url} did not fetched!`);
        }

        return this.fetchAll(RequestConfig, tries - 1);
      });
  }

  async fetchByID(
    id: EntityId,
    RequestConfig: AxiosRequestConfig = {},
    tries: number = DefaultTriesCount,
  ): Promise<AxiosResponse<FetchType>> {
    const url = `${this.url}${id}`;
    return await axios
      .get<FetchType>(url, this.setAuthenticationHeader(RequestConfig))
      .catch(() => {
        if (tries === 0) {
          throw new Error(`Item ${this.url} did not fetched!`);
        }

        return this.fetchByID(id, RequestConfig, tries - 1);
      });
  }

  async create(
    data: RequestType,
    RequestConfig: AxiosRequestConfig = {},
    tries: number = DefaultTriesCount,
  ): Promise<AxiosResponse<FetchType>> {
    RequestConfig = this.setAuthenticationHeader(RequestConfig);

    const result = await axios
      .post<FetchType>(this.url, data, RequestConfig)
      .catch(() => {
        if (tries === 0) {
          throw new Error(`Item ${this.url} did not created!`);
        }

        return this.create(data, RequestConfig, tries - 1);
      });

    return result;
  }

  async update(
    id: EntityId,
    data: Partial<RequestType>,
    RequestConfig: AxiosRequestConfig = {},
    tries: number = DefaultTriesCount,
  ): Promise<AxiosResponse<FetchType>> {
    const url = `${this.url}${id}`;
    return await axios
      .patch<FetchType>(url, data, this.setAuthenticationHeader(RequestConfig))
      .catch(() => {
        if (tries === 0) {
          throw new Error(`Item ${this.url} did not updated!`);
        }

        return this.update(id, data, RequestConfig, tries - 1);
      });
  }

  async remove(
    id: EntityId,
    RequestConfig: AxiosRequestConfig = {},
    tries: number = DefaultTriesCount,
  ): Promise<AxiosResponse<FetchType>> {
    const url = `${this.url}${id}`;
    return await axios
      .delete<FetchType>(url, this.setAuthenticationHeader(RequestConfig))
      .catch(() => {
        if (tries === 0) {
          throw new Error(`Item ${this.url} did not updated!`);
        }

        return this.remove(id, RequestConfig, tries - 1);
      });
  }

  private setAuthenticationHeader(RequestConfig: AxiosRequestConfig) {
    const tokenValue = CSI.getCredential('access');
    const headerValue = `Bearer ${tokenValue}`;

    if (!RequestConfig.headers) {
      RequestConfig['headers'] = {};
    }

    RequestConfig.headers['Authorization'] = headerValue;

    return RequestConfig;
  }
}
