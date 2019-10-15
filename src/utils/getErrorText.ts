import { errorMessages } from './errorMessages'

const errorTypes = ['required', 'minLength', 'maxLength', 'minValue', 'maxValue', 'url']

export const getErrorText = (error: any) : string => {
  if (error.required === false) return errorMessages.required

  if (error.minLength === false) return errorMessages.minLength(error.$params.minLength.min)

  if (error.maxLength === false) return errorMessages.maxLength(error.$params.maxLength.max)

  if (error.minValue === false) return errorMessages.minValue(error.$params.minValue.min)

  if (error.maxValue === false) return errorMessages.maxValue(error.$params.maxValue.max)

  if (error.url === false) return errorMessages.url

  return errorMessages.default
}
