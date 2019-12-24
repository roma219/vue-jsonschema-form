import { errorMessages } from '../errorMessages'

describe('errorMessages', () => {
  it('errorMessages should be defined', () => {
    expect(errorMessages).toBeDefined()
  })

  it('errorMessage property should be either string or function', () => {
    expect(Object.values(errorMessages).every(errorMessage => typeof errorMessage === 'string' || typeof errorMessage === 'function')).toBe(true)
  })

  it('errorMessage callback functions should return string value', () => {
    expect(Object.values(errorMessages).filter(errorMessage => typeof errorMessage === 'function').every((errorMessage: any) => typeof errorMessage() === 'string' )).toBe(true)
  })
})
