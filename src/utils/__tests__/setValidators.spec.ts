import { setValidators } from '../setValidators'
import { schemaWithValidations } from '../__testData__'
import required from 'vuelidate/lib/validators/required'
import minLength from 'vuelidate/lib/validators/minLength'
import maxLength from 'vuelidate/lib/validators/maxLength'
import minValue from 'vuelidate/lib/validators/minValue'
import maxValue from 'vuelidate/lib/validators/maxValue'
import { ISchema } from '@/types'

const validators = jest.genMockFromModule('vuelidate/lib/validators')

describe('[JSON-SCHEMA] utils.setValidators helper function', () => {
  it('correctly generates validators', () => {
    const validations = setValidators(schemaWithValidations as ISchema)

    expect(JSON.stringify(validations)).toMatch(JSON.stringify({
      text: {
        required,
        minLength: minLength(1)
      },
      number: {
        required,
        minValue: minValue(1)
      },
      float: {
        required,
        minValue: minValue(3)
      },
      checkbox: {},
      arr: {
        required,
        minLength: minLength(1)
      },
      nested: {
        test2: { maxLength: maxLength(10) },
        nested2: {
          arrOfObjects: {
            $each: {
              aaa: {
                minLength: minLength(2),
                required
              },
              bbb: {
                maxValue: maxValue(10)
              }
            }
          },
          zog: {}
        }
      }
    }))
  })
})
