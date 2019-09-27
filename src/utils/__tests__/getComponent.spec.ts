import { getComponent } from '../getComponent'

describe('getComponent utility function', () => {
  it('passes example test', () => {
    const component = getComponent({ type: 'string', __component__: '', __eventName__: '' })

    expect(component).toEqual({
      eventName: 'input',
      matcher: {
        type: 'string'
      },
      name: 'TextInput'
    })
  })
})
