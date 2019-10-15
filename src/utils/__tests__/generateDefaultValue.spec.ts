import { generateDefaultValue } from '../generateDefaultValue'
import { ISchema } from '@/types'

describe('generateDefaultValue utility function', () => {
  it('type=string is TextInput', () => {
    const value = generateDefaultValue({
      type: 'object',
      properties: {
        a: { type: 'string', default: 'aaa', componentName: '', eventName: '' },
        b: { type: 'number', default: 123, componentName: '', eventName: '' }
      },
      componentName: '',
      eventName: ''
    } as ISchema)

    expect(value).toEqual({ a: 'aaa', b: 123 })
  })
})
