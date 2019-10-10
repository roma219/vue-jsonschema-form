import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'
import { isMatch } from 'underscore'
import { IComponent, ISchema, IUiSchema, IConfig } from '@/types'
import config from './config'

export const getComponent = (schema: any, uiSchema?: IUiSchema, customConfig?: IConfig) : IComponent => {
  const components = [ ...(customConfig?.components || []), ...config.components || [] ]

  const component = components.find(configItem => {
    if (configItem.matcher) return isMatch(schema, configItem.matcher)
    if (configItem.contains) return schema.hasOwnProperty(configItem.contains)
  })

  const { componentName = 'TextInput', eventName = 'input', props = undefined } = (component || {})

  return { componentName, eventName, props }
}
