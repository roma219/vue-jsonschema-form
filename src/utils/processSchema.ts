import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'
import { getComponent } from './getComponent'

export const processSchema = (schema: any) : any => {
  const processedSchema = { ...schema }
  const component = getComponent(processedSchema)

  if (component) {
    processedSchema.__component__ = component.name
    processedSchema.__eventName__ = component.eventName
    processedSchema.__props__ = component.props
  }
  Object.entries(processedSchema.properties || {}).forEach(([propName, propSchema]) => {
    if (!processedSchema.properties || !processedSchema.properties[propName]) return

    processedSchema.properties[propName] = processSchema(propSchema)
  })

  return processedSchema
}
