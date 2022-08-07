import {Observable} from 'rxjs';
import {IPagination, Page} from "./page.model";

export interface CrudOperations<T, ID> {
  save(t: T): Observable<T>;

  update(id: ID, t: T): Observable<T>;

  findOne(id: ID): Observable<T>;

  findAll(): Observable<T[]>;

  findPage(pagination?: IPagination): Observable<Page<T>>;

  delete(id: ID): Observable<T>;
}
