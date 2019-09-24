export const getErrorText = (error: any) : string => {
  if (error.required === false) return 'Field is required'

  if (error.minLength === false) return `Minimal length: ${error.$params.minLength.min}`

  if (error.maxLength === false) return `Maximum length: ${error.$params.maxLength.max}`

  if (error.minValue === false) return `Minimal value: ${error.$params.minValue.min}`

  if (error.maxValue === false) return `Maximum value: ${error.$params.maxValue.max}`

  if (error.url === false) return 'Invalid URL'

  return 'Invalid value'
}
