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


export interface SortGen { 
    empty?: boolean;
    unsorted?: boolean;
    sorted?: boolean;
}

export class SortGen_ {
  static readonly empty = 'empty';
  readonly empty = 'empty';
  static readonly unsorted = 'unsorted';
  readonly unsorted = 'unsorted';
  static readonly sorted = 'sorted';
  readonly sorted = 'sorted';
  static fields() {
    return new SortGen_();
  }
}

