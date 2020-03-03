import { errorMessages } from './errorMessages'
import { ISchema } from '@/types'

export const getErrorText = (error: any, schema: ISchema) : string => {
  if (error.required === false) return errorMessages.required

  if (error.minLength === false) return errorMessages.minLength(schema.minLength)

  if (error.maxLength === false) return errorMessages.maxLength(schema.maxLength)

  if (error.minValue === false) return errorMessages.minValue(schema.minimum)

  if (error.maxValue === false) return errorMessages.maxValue(schema.maximum)

  if (error.url === false) return errorMessages.url

  return errorMessages.default
}
