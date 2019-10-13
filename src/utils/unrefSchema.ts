import { ISchema } from '@/types'

// convert schema with refs into unreffed schema
export const unrefSchema = (schema: ISchema) : any => {
  const unreffedSchema = { ...schema }
  return unreffedSchema
}
