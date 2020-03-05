import clone from 'nanoclone'
import { ISchema, ISchemaObject } from '@/types'

export const unrefSchema = (schema: ISchemaObject) => {
  function getSchemaByRef (ref: string) : ISchema {
    const refName = ref.substring(ref.lastIndexOf('/') + 1)

    if (!definitionNames.includes(refName)) {
      console.warn(`[JSON-SCHEMA] Ref="${ref}" not found in definitions`)
      return { type: 'string' } // definition not found - treat it as a string
    }

    return clone(definitions[refName])
  }

  function checkSchemaForRefs (schema: ISchemaObject) : ISchemaObject {
    const newSchema = { ...schema }

    // unref properties
    if (newSchema.properties) {
      Object.keys(newSchema.properties).forEach(propertyName => {
        if (newSchema.properties[propertyName].$ref) {
          const definedSchema = getSchemaByRef(newSchema.properties[propertyName].$ref as string)

          newSchema.properties[propertyName] = {
            ...newSchema.properties[propertyName],
            ...definedSchema
          }
        }

        if (newSchema.properties[propertyName].type === 'array' &&
          newSchema.properties[propertyName].items
        ) {
          // if (!newSchema.properties[propertyName].items) return
          const definedSchema = newSchema.properties[propertyName] && newSchema.properties[propertyName].items && (newSchema.properties[propertyName].items as any).$ref
            ? getSchemaByRef((newSchema.properties[propertyName].items as any).$ref as string)
            : newSchema.properties[propertyName].items

          ;(newSchema.properties[propertyName].items as any) = {
            ...newSchema.properties[propertyName].items,
            ...definedSchema
          }

          newSchema.properties[propertyName].items = checkSchemaForRefs(newSchema.properties[propertyName].items as ISchemaObject)
        }

        if (newSchema.properties[propertyName].type === 'object') {
          newSchema.properties[propertyName] = checkSchemaForRefs(newSchema.properties[propertyName] as ISchemaObject)
        }
      })
    }

    // unref conditions
    (newSchema.allOf || []).forEach(condition => {
      if (condition.then && condition.then.properties) {
        condition.then = checkSchemaForRefs(condition.then)
      }
    })

    if (newSchema.then && newSchema.then.properties) {
      newSchema.then = checkSchemaForRefs(newSchema.then)
    }

    return newSchema
  }

  const definitions : any = schema.definitions || {}
  const definitionNames = Object.keys(definitions)
  const dereferencedSchema = checkSchemaForRefs(schema)

  delete dereferencedSchema.definitions

  return dereferencedSchema
}
