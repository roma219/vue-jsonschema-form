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
export interface IComponent {
  name: string
  eventName: string
  props?: IAnyObject
}


export interface IInnerSchema {
  type: JSONSchema7TypeName
  title?: string
  properties?: {
    [key: string]: IInnerSchema
  }
  enum?: Array<any>
  __component__: string
  __eventName__: string
  __props__?: any
  default?: any
}
