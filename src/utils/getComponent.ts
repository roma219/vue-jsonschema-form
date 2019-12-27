import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'
import { IComponent, ISchema, IUiSchema, IAnyObject, ComponentsConfig } from '@/types'
import { defaultComponents } from './defaultComponents'

const isMatch = (target : IAnyObject, source : IAnyObject) : boolean => {
  return Object.entries(source).every(([propName, value]) => value === target[propName])
}

export const getComponent = (schema: ISchema, customComponents: ComponentsConfig = [], uiSchema?: IUiSchema) : IComponent => {
  const components = [ ...customComponents, ...defaultComponents ]

  const component = components.find(component => {
    if (component.matcher) return isMatch(schema, component.matcher)
    if (component.uiSchemaMatcher) return isMatch(uiSchema || {}, component.uiSchemaMatcher)
    if (component.contains) return schema.hasOwnProperty(component.contains)
  })

  const { componentName = 'TextInput', eventName = 'input', props = undefined } = (component || {})

  return { componentName, eventName, props }
}
