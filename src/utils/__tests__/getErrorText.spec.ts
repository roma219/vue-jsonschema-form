import { getErrorText } from '../getErrorText'
import { errorMessages } from '../errorMessages'

describe('getErrorText utility function', () => {
  it('returns correct messages', () => {
    expect(getErrorText({ required: false }, { type: 'object' })).toBe(errorMessages.required)
    expect(getErrorText({ minLength: false, $params: { minLength: { min: 3 } } }, { type: 'string', minLength: 3 })).toBe(errorMessages.minLength(3))
    expect(getErrorText({ maxLength: false, $params: { maxLength: { max: 3 } } }, { type: 'string', maxLength: 3 })).toBe(errorMessages.maxLength(3))
    expect(getErrorText({ minValue: false, $params: { minValue: { min: 3 } } }, { type: 'number', minimum: 3 })).toBe(errorMessages.minValue(3))
    expect(getErrorText({ maxValue: false, $params: { maxValue: { max: 3 } } }, { type: 'number', maximum: 3 })).toBe(errorMessages.maxValue(3))
    expect(getErrorText({ url: false }, { type: 'object' })).toBe(errorMessages.url)
    expect(getErrorText({ }, { type: 'object' })).toBe(errorMessages.default)
  })
})
