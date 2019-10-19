import { getComponent } from '../getComponent'
import { defaultComponents } from '../defaultComponents'

const getComponentByName = (name: string) => {
  const { componentName, eventName, props } : any = (defaultComponents || []).find(component => component.componentName === name)

  return { componentName, eventName, props }
}

describe('getComponent utility function - default config', () => {
  it('type=string is TextInput', () => {
    const component = getComponent({ type: 'string' })

    expect(component).toEqual(getComponentByName('TextInput'))
  })

  it('type=boolean is Checkbox', () => {
    const component = getComponent({ type: 'boolean' })

    expect(component).toEqual(getComponentByName('Checkbox'))
  })

  it('type=object is JsonSchemaForm', () => {
    const component = getComponent({ type: 'object' })

    expect(component).toEqual(getComponentByName('JsonSchemaForm'))
  })

  it('enum is Select', () => {
    const component = getComponent({ enum: [1, 2, 3] } as any)

    expect(component).toEqual(getComponentByName('Select'))
  })

  it('array is special inner component', () => {
    const component = getComponent({ type: 'array' })

    expect(component).toEqual(getComponentByName('JsonSchemaArray'))
  })

  it('use TextInput when could not detect component', () => {
    const component = getComponent({ type: 'kek' } as any)

    expect(component).toEqual(getComponentByName('TextInput'))
  })
})
