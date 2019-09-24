import config from './config'

const errorTypes = ['required', 'minLength', 'maxLength', 'minValue', 'maxValue', 'url']

export const getErrorText = (error: any) : string => {
  if (error.required === false) return config.errorMessages.required

  if (error.minLength === false) return config.errorMessages.minLength(error.$params.minLength.min)

  if (error.maxLength === false) return config.errorMessages.minLength(error.$params.maxLength.max)

  if (error.minValue === false) return config.errorMessages.minLength(error.$params.minValue.min)

  if (error.maxValue === false) return config.errorMessages.minLength(error.$params.maxValue.max)

  if (error.url === false) return config.errorMessages.url

  return config.errorMessages.default
}
