import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'

type SchemaTypeName = 'string' | 'number' | 'boolean' | 'object' | 'integer' | 'array'

// Schema types
export interface ISchemaBase {
  type: SchemaTypeName
  title?: string
  description?: string
  format?: string
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  default?: any
  properties?: { [key: string]: ISchema }
  enum?: Array<any>
  items?: ISchema
}

export interface ISchemaObject extends ISchemaBase {
  type: 'object'
  properties: { [key: string]: ISchema }
}

export interface ISchemaSelect extends ISchemaBase {
  enum: Array<any>
}

export interface ISchemaArray extends ISchemaBase {
  type: 'array'
  items: ISchema
}

export type ISchema = ISchemaBase | ISchemaObject | ISchemaSelect | ISchemaArray

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

export type ComponentsConfig = Array<IConfigComponent>

export type WrapperComponentConfig = IWrapperComponent

export type ErrorMessagesConfig = any

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
