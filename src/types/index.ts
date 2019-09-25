import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'

// Schema types
export interface ISchema {
  type: JSONSchema7TypeName
  title?: string
  description?: string
  format?: string
  properties?: { [key: string]: ISchema }
  enum?: Array<any>
  __component__: string
  __eventName__: string
  __props__?: any
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
}

export interface IUiSchema {
  titles?: Array<string>
  order?: number
  properties?: { [key: string]: IUiSchema }
}

// config types
export interface IConfig {
  inputWrapper?: IWrapperComponent
  components?: Array<IConfigComponent>
  errorMessages?: any
}
export interface IComponent {
  name: string
  eventName: string
  props?: (schema: any, uiSchema: IUiSchema) => IAnyObject,
}

export interface IWrapperComponent {
  name: string,
  props?: (propName: string, schema: any, uiSchema: IUiSchema | undefined) => IAnyObject
}

interface IConfigComponent {
  matcher?: IAnyObject,
  props?: (schema: any, uiSchema: IUiSchema | undefined) => IAnyObject,
  contains?: string,
  name: string,
  eventName: string
}

// common types
export interface IAnyObject {
  [key:string] : any
}

// validations
// export interface IValidations {
//   [key: 'required' | 'minLength' | 'maxLength' | 'minimum' | 'maximum' | 'phone'] ?: any
//   $each?: IValidations

// }
