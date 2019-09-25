import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'
import { isMatch } from 'underscore'
import { IComponent, ISchema, IUiSchema, IConfig } from '@/types'
import config from './config'

export const getComponent = (schema: ISchema, uiSchema?: IUiSchema, customConfig?: IConfig) : IComponent | undefined => {
  const components = [ ...(customConfig && customConfig.components) || [], ...config.components || [] ]

  if (!components) return

  const component = components.find(configItem => {
    if (configItem.matcher) return isMatch(schema, configItem.matcher)
    if (configItem.contains) return schema.hasOwnProperty(configItem.contains) && !!(schema as any)[configItem.contains]

    return false
  })

  if (!component) console.warn('[vue-jsonschema-form] couldnt detect component for schema: ', schema)

  return component
}
