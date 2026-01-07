import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GenericCrudService {

  constructor(private http: HttpClient) {}

  fetch(
    resource: string,
    query: {
      page: number;
      pageSize: number;
      sortField?: string;
      sortDir?: 'asc' | 'desc';
      filters?: Record<string, any>;
    }
  ): Observable<{ items: any[]; total: number }> {

    /** MOCK MODE */
    if (environment.useMockApi) {
      return this.http.get<{ items: any[]; total: number }>(
        `${environment.mockBasePath}/${resource}.mock.json`
      );
    }

    /** REAL API MODE */
    let params = new HttpParams()
      .set('page', query.page)
      .set('pageSize', query.pageSize);

    if (query.sortField) {
      params = params
        .set('sort', query.sortField)
        .set('dir', query.sortDir || 'asc');
    }

    if (query.filters) {
      Object.keys(query.filters).forEach(key => {
        const value = query.filters![key];
        if (value !== null && value !== undefined && value !== '') {
          params = params.set(`filter[${key}]`, value);
        }
      });
    }

    return this.http.get<{ items: any[]; total: number }>(
      `${environment.apiBaseUrl}/${resource}`,
      { params }
    );
  }
}
