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
import { EtapeGen } from './etape.gen.model';


export interface EntrainementGen { 
    version?: number;
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    id?: number;
    dtype?: string;
    nom: string;
    typeEntrainement: EntrainementGen.TypeEntrainementEnum;
    etapes?: Array<EtapeGen>;
    rounds?: number;
    minute?: number;
}
export namespace EntrainementGen {
    export type TypeEntrainementEnum = 'DEFAUT' | 'MUSCULATION' | 'AMRAP' | 'FOR_TIME' | 'ROUNDS' | 'EMOM';
    export const TypeEntrainementEnum = {
        DEFAUT: 'DEFAUT' as TypeEntrainementEnum,
        MUSCULATION: 'MUSCULATION' as TypeEntrainementEnum,
        AMRAP: 'AMRAP' as TypeEntrainementEnum,
        FOR_TIME: 'FOR_TIME' as TypeEntrainementEnum,
        ROUNDS: 'ROUNDS' as TypeEntrainementEnum,
        EMOM: 'EMOM' as TypeEntrainementEnum
    };
}


export class EntrainementGen_ {
  static readonly version = 'version';
  readonly version = 'version';
  static readonly createdBy = 'createdBy';
  readonly createdBy = 'createdBy';
  static readonly createdDate = 'createdDate';
  readonly createdDate = 'createdDate';
  static readonly updatedBy = 'updatedBy';
  readonly updatedBy = 'updatedBy';
  static readonly updatedDate = 'updatedDate';
  readonly updatedDate = 'updatedDate';
  static readonly id = 'id';
  readonly id = 'id';
  static readonly dtype = 'dtype';
  readonly dtype = 'dtype';
  static readonly nom = 'nom';
  readonly nom = 'nom';
  static readonly typeEntrainement = 'typeEntrainement';
  readonly typeEntrainement = 'typeEntrainement';
  static readonly etapes = 'etapes';
  readonly etapes = 'etapes';
  static readonly rounds = 'rounds';
  readonly rounds = 'rounds';
  static readonly minute = 'minute';
  readonly minute = 'minute';
  static fields() {
    return new EntrainementGen_();
  }
}
