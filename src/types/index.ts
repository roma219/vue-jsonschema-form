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
}

export interface IComponent {
  name: string
  eventName: string
  props?: (schema: any, uiSchema: any) => IAnyObject,
}


// config types
export interface IConfig {
  components: Array<IConfigComponent>
}

interface IConfigComponent {
  matcher: IAnyObject,
  props: (schema: any, uiSchema: any) => IAnyObject,
  contains?: string,
  name: string,
  eventName: string
}


// common types
export interface IAnyObject {
  [key:string] : any
}
