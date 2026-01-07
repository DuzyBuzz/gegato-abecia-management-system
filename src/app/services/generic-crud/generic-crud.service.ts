import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GenericCrudService {

  // 🔁 toggle this when backend is ready
  private readonly USE_MOCK = true;

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

    if (this.USE_MOCK) {
      return this.http.get<{ items: any[]; total: number }>(
        `/assets/mock/${resource}.mock.json`
      );
    }

    // REAL API (later)
    let params = new HttpParams()
      .set('page', query.page)
      .set('pageSize', query.pageSize);

    if (query.sortField) {
      params = params.set('sort', query.sortField)
                     .set('dir', query.sortDir || 'asc');
    }

    if (query.filters) {
      Object.keys(query.filters).forEach(key => {
        if (query.filters![key]) {
          params = params.set(`filter[${key}]`, query.filters![key]);
        }
      });
    }

    return this.http.get<{ items: any[]; total: number }>(
      `/api/${resource}`,
      { params }
    );
  }
}
