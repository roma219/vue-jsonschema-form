import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'

// Schema types
export interface ISchema {
  type: JSONSchema7TypeName
  title?: string
  description?: string
  format?: string
  properties?: { [key: string]: ISchema }
  enum?: Array<any>
  componentName: string
  eventName: string
  props?: any
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  default?: any
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
  componentName: string
  eventName: string
  props?: (schema: any, uiSchema: IUiSchema) => IAnyObject,
}

export interface IWrapperComponent {
  componentName: string,
  props?: (propName: string, schema: any, uiSchema: IUiSchema | undefined) => IAnyObject
}

interface IConfigComponent {
  matcher?: IAnyObject,
  contains?: string,
  componentName: string,
  eventName: string,
  props?: (schema: any, uiSchema: IUiSchema | undefined) => IAnyObject
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
