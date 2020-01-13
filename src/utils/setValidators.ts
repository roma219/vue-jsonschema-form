import required from 'vuelidate/lib/validators/required'
import minLength from 'vuelidate/lib/validators/minLength'
import maxLength from 'vuelidate/lib/validators/maxLength'
import minValue from 'vuelidate/lib/validators/minValue'
import maxValue from 'vuelidate/lib/validators/maxValue'
import { ISchema } from '@/types'

export const setValidators = (schema: ISchema) : any => {
  const validations : any = {}

  if (schema.properties) {
    Object.keys(schema.properties).forEach((property) => {
      const propertyObject : any = (schema.properties as any)[property]

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
