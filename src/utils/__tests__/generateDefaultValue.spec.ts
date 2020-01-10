import { generateDefaultValue } from '../generateDefaultValue'

describe('generateDefaultValue utility function', () => {
  it('type=string is TextInput', () => {
    const value = generateDefaultValue({
      type: 'object',
      properties: {
        a: { type: 'string' },
        b: { type: 'number', default: 123 },
        c: { type: 'object', properties: { d: { type: 'string', default: 'a' } } },
        e: { type: 'object' }
      }
    })

    expect(value).toEqual({ b: 123, c: { d: 'a' }, e: {} })
  })
})
