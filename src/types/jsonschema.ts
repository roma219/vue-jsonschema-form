import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'

export interface IJsonSchema extends JSONSchema7 {
  type?: JSONSchema7TypeName
  __uitype__?: string // todo: should be removed
  __collapsible__?: boolean // todo: should be removed
  items?: IJsonSchema
  properties?: {
    [key: string]: IJsonSchema
  }
  definitions?: {
    [key: string]: IJsonSchema
  },
  allOf?: Array<IJsonSchema>
  oneOf?: Array<IJsonSchema>
  if?: IJsonSchema,
  then?: IJsonSchema,
  not?: IJsonSchema
}

export interface IAnyObject {
  [key:string] : any
}

export interface IPropsObjectJsonSchemaForm {
  type: string
  error?: string
  value: string|number|object
  text?: string
  title?: string
  tooltip?: string
  schema?: object
  uiSchema?: object
  validations?: object
  itemsSchema?: object
  emitOnCreate?: boolean
  allowEmpty?: boolean
  openDirection?: string
  options?: Array<any>
  itemsMinCount?: number
  itemsMaxCount?: number
  format?: string
  errors?: object,
  dictionaryUrl?: string
}
