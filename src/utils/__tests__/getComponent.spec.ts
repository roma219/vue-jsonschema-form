import { getComponent } from '../getComponent'

describe('getComponent utility function', () => {
  it('passes example test', () => {
    const component = getComponent({ type: 'string', componentName: '', eventName: '' })

    expect(component).toEqual({
      eventName: 'input',
      matcher: {
        type: 'string'
      },
      name: 'TextInput'
    })
  })
})
