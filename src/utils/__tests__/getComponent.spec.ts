import { getComponent } from '../getComponent'

describe('getComponent utility function', () => {
  it('passes example test', () => {
    const component = getComponent({ type: 'string', componentName: '', eventName: '' })

    expect(component).toEqual({
      componentName: 'TextInput',
      eventName: 'input',
      props: undefined
    })
  })
})
