import { defaultComponents, inputWrapper } from '../defaultComponents'

describe('defaultComponents', () => {
  it('defaultComponents and inputWrapper should be defined', () => {
    expect(defaultComponents).toBeDefined()
    expect(inputWrapper).toBeDefined()
  })

  it('is array of objects', () => {
    expect(Array.isArray(defaultComponents)).toBe(true)
    expect(defaultComponents.every(component => typeof component === 'object')).toBe(true)
  })

  it('each components has matcher (matcher, uiSchemaMatcher, contains) property', () => {
    expect(defaultComponents.every(component => component.matcher || component.uiSchemaMatcher || component.contains)).toBe(true)
  })

  it('optional props callback should be a function', () => {
    expect(defaultComponents.filter(component => component.props).every(component => typeof component.props === 'function')).toBe(true)
  })

  it('optional props callback should return an object', () => {
    expect(defaultComponents
      .filter(component => component.props)
      .every(component => component.props && typeof component.props('q', {}) === 'object')
    ).toBe(true)
  })

  it('each component should have a componentName and eventName properties', () => {
    expect(defaultComponents.every(component => component.componentName && component.eventName)).toBe(true)
  })

  it('inputWrapper should have componentName and props properties', () => {
    expect(inputWrapper.componentName).toBeDefined()
    expect(inputWrapper.props).toBeDefined()
    expect(typeof inputWrapper.props).toBe('function')
    if (inputWrapper.props) {
      expect(typeof inputWrapper.props('q', {}, {})).toBe('object')
      expect(inputWrapper.props('q', { title: 'kek', type: 'object' }, {})).toEqual({ title: 'kek', vertical: true })
    }
  })
})
