import { required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators'
import { withParams } from 'vuelidate'

import { ISchema } from '@/types'

const correctPhone = (valueToCompare: any) => {
  const regexp = RegExp('^(\\+\\d{1,3}|\\d)?(\\s\\d{3,5}\\s)(\\d{1,3}[-]\\d{2}[-]\\d{2})$')

  return withParams({ type: 'phone', value: valueToCompare }, (value: any) => regexp.test(value))
}

export const setValidators = (schema: ISchema) : any => {
  const validations : any = {}

  if (schema.properties) {
    Object.keys(schema.properties).forEach((property) => {
      const propertyObject : any = schema.properties ? schema.properties[property] : {}

      validations[property] = {}

      // requireds
      if ((propertyObject.type === 'string' && propertyObject.minLength) ||
          (propertyObject.type === 'number' && propertyObject.minimum) ||
          (propertyObject.type === 'integer' && propertyObject.minimum) ||
          (propertyObject.type === 'array' && propertyObject.minLength)) {
        validations[property].required = required
      }

      if (propertyObject.minLength) validations[property].minLength = minLength(propertyObject.minLength)

      if (propertyObject.maxLength) validations[property].maxLength = maxLength(propertyObject.maxLength)

      if (propertyObject.minimum) validations[property].minValue = minValue(propertyObject.minimum)

      if (propertyObject.maximum) validations[property].maxValue = maxValue(propertyObject.maximum)

      // set nested validators
      if (propertyObject.type === 'object') validations[property] = setValidators(propertyObject)

      // if (propertyObject.const) validations[property].isEqual = shouldEqual(propertyObject.const)

      if (propertyObject.format === 'phone') validations[property].phone = correctPhone(propertyObject)

      // set item validators for array of objects
      if (propertyObject.type === 'array' && propertyObject.items && propertyObject.items.type === 'object') {
        validations[property] = {
          ...validations[property],
          $each: setValidators(propertyObject.items)
        }
      }
    })
  }

  return validations
}
