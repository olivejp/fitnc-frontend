/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { EntrainementGen } from './entrainement.gen.model';
import { SortGen } from './sort.gen.model';
import { PageableObjectGen } from './pageable-object.gen.model';


export interface PageEntrainementGen { 
    totalPages?: number;
    totalElements?: number;
    first?: boolean;
    last?: boolean;
    size?: number;
    content?: Array<EntrainementGen>;
    number?: number;
    sort?: SortGen;
    pageable?: PageableObjectGen;
    numberOfElements?: number;
    empty?: boolean;
}

export class PageEntrainementGen_ {
  static readonly totalPages = 'totalPages';
  readonly totalPages = 'totalPages';
  static readonly totalElements = 'totalElements';
  readonly totalElements = 'totalElements';
  static readonly first = 'first';
  readonly first = 'first';
  static readonly last = 'last';
  readonly last = 'last';
  static readonly size = 'size';
  readonly size = 'size';
  static readonly content = 'content';
  readonly content = 'content';
  static readonly number = 'number';
  readonly number = 'number';
  static readonly sort = 'sort';
  readonly sort = 'sort';
  static readonly pageable = 'pageable';
  readonly pageable = 'pageable';
  static readonly numberOfElements = 'numberOfElements';
  readonly numberOfElements = 'numberOfElements';
  static readonly empty = 'empty';
  readonly empty = 'empty';
  static fields() {
    return new PageEntrainementGen_();
  }
}

