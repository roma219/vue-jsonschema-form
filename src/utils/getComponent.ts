import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'
import { IComponent, ISchema, IUiSchema, IConfig, IAnyObject, ComponentsConfig } from '@/types'
import config from './config'

const isMatch = (target : IAnyObject, source : IAnyObject) : boolean => {
  return Object.entries(source).every(([propName, value]) => value === target[propName])
}

export const getComponent = (schema: any, customComponents: ComponentsConfig = [], uiSchema?: IUiSchema) : IComponent => {
  const components = [ ...customComponents, ...config.components || [] ]

  const component = components.find(configItem => {
    if (configItem.matcher) return isMatch(schema, configItem.matcher)
    if (configItem.contains) return schema.hasOwnProperty(configItem.contains)
  })

  const { componentName = 'TextInput', eventName = 'input', props = undefined } = (component || {})

  return { componentName, eventName, props }
}
