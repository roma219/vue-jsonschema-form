import { errorMessages } from './errorMessages'
import { ErrorMessagesConfig } from '@/types'

const errorTypes = ['required', 'minLength', 'maxLength', 'minValue', 'maxValue', 'url']

const defaultErrorMessages : ErrorMessagesConfig = {
  minLength: (value: number) => `Minimal length: ${value}`,
  maxLength: (value: number) => `Maximum length: ${value}`,
  minValue: (value: number) => `Minimal value: ${value}`,
  maxValue: (value: number) => `Maximum value: ${value}`,
  required: 'Field is required',
  default: 'Invalid Value'
}

export const getErrorText = (error: any) : string => {
  if (error.required === false) return errorMessages.required

  if (error.minLength === false) return errorMessages.minLength(error.$params.minLength.min)

  if (error.maxLength === false) return errorMessages.maxLength(error.$params.maxLength.max)

  if (error.minValue === false) return errorMessages.minValue(error.$params.minValue.min)

  if (error.maxValue === false) return errorMessages.maxValue(error.$params.maxValue.max)

  if (error.url === false) return errorMessages.url

  return errorMessages.default
}
