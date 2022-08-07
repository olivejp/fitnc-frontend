export class Filter {
  constructor(
    public field: string,
    public value: unknown,
    public operator?: string
  ) {}
}

export enum OperatorFilter {
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
  START_WITH = 'startsWith',
  END_WITH = 'endsWith',
  CONTAINS = 'contains',
  CONTAINS_IN = 'containsIn',
  NOT_CONTAINS = 'notContains',
  GREATER_THAN = 'greaterThan',
  GREATER_THAN_OR_EQUAL = 'greaterThanOrEqual',
  LESS_THAN = 'lessThan',
  LESS_THAN_OR_EQUAL = 'lessThanOrEqual',
}
