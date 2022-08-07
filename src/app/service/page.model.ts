export interface IPagination {
  page?: number;
  size?: number;
  sort?: string[];
}

export class Sort {
  constructor(
    public empty?: boolean,
    public sorted?: boolean,
    public unsorted?: boolean
  ) {}
}

export class Pageable {
  constructor(
    public offset?: number,
    public pageNumber?: number,
    public pageSize?: number,
    public paged?: boolean,
    public sort?: Sort,
    public size?: number
  ) {}
}

export class Page<T> {
  constructor(
    public content: T[],
    public totalElements: number,
    public number?: number,
    public numberOfElements?: number,
    public totalPages?: number,
    public empty?: boolean,
    public first?: boolean,
    public last?: boolean,
    public pageable?: Pageable
  ) {}
}
