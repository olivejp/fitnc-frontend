import {Observable} from 'rxjs';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {IPagination, Page} from "./page.model";
import {CrudOperations} from "./crud-operation.interface";
import {Filter} from "./filter.model";

export abstract class AbstractRestService<T, ID>
  implements CrudOperations<T, ID> {
  protected constructor(protected _http: HttpClient, protected _base: string) {
  }

  FORMAT_ISO_DATE_TIME = 'yyyy-MM-dd HH:mm:ss';

  serializeDate(date: Date): string {
    return formatDate(date, this.FORMAT_ISO_DATE_TIME, 'fr-FR');
  }

  createRequestOption(
    pagination?: IPagination,
    filters?: Filter[]
  ): HttpParams {
    let options: HttpParams = new HttpParams();

    if (pagination) {
      Object.keys(pagination).forEach((key: string) => {
        if (key !== 'sort') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          options = options.set(key, pagination[key]);
        }
      });
      if (pagination['sort']) {
        pagination['sort'].forEach((val: string) => {
          options = options.append('sort', val);
        });
      }
    }

    if (filters) {
      filters.forEach((filter: Filter) => {
        const operator = filter.operator ? `|${filter.operator}` : '';
        const isDate = filter.value instanceof Date;
        const filterValue = isDate
          ? this.serializeDate(filter.value as Date)
          : filter.value;
        options = options.set(
          `${filter.field}${operator}`,
          filterValue as string | number | boolean
        );
      });
    }

    return options;
  }

  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._base + '/' + id, t, {});
  }

  findOne(id: ID): Observable<T> {
    return this._http.get<T>(this._base + '/' + id);
  }

  findOneHttpResponse(id: ID): Observable<HttpResponse<T>> {
    return this._http.get<T>(this._base + '/' + id, {observe: 'response'});
  }

  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this._base);
  }

  findPage(pagination?: IPagination, filters?: Filter[]): Observable<Page<T>> {
    const params = this.createRequestOption(pagination, filters);
    return this._http.get<Page<T>>(this._base, {params});
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._base + '/' + id);
  }

  deleteAll(ids: ID[]): Observable<unknown> {
    return this._http.delete<T>(this._base + '/' + ids.join(','));
  }
}
