import { errorMessages } from './errorMessages'
import { ErrorMessagesConfig } from '@/types'

export const getErrorText = (error: any, customErrorMessages: ErrorMessagesConfig = {}) : string => {
  if (error.required === false) return errorMessages.required

  if (error.minLength === false) return errorMessages.minLength(error.$params.minLength.min)

  if (error.maxLength === false) return errorMessages.maxLength(error.$params.maxLength.max)

  if (error.minValue === false) return errorMessages.minValue(error.$params.minValue.min)

  if (error.maxValue === false) return errorMessages.maxValue(error.$params.maxValue.max)

  if (error.url === false) return errorMessages.url

  return errorMessages.default
}
