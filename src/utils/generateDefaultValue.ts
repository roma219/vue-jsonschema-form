import { ISchema } from '@/types'

// export const generateDefaultValue = (schema: ISchema) : { [key: string]: any } => {
//   const value = {}
//   if (schema.default) return schema.default

//   if (schema.type === 'object') {
//       Object.keys(schema.properties || {}).forEach(propName => {
//         value[propName] = generateDefaultValue(schema.properties[propName])
//       })
//   }
//   return value
// }
