import { getComponent } from '../getComponent'
import { defaultComponents } from '../defaultComponents'
import { ISchema } from '@/types'

const getComponentByNameAndType = (name: string, type: string = 'string') => {
  const components : any = (defaultComponents || []).filter(component => component.componentName === name)
  let component = components[0]
  if (components.length > 1) {
    let component = components.find((item: any) => item.matcher.type === type)
  }
  const { componentName, eventName, props } = component

  return { componentName, eventName, props }
}

describe('getComponent utility function - default config', () => {
  it('type=boolean is Checkbox', () => {
    const component = getComponent({ type: 'boolean' } as ISchema)

    expect(component).toEqual(getComponentByNameAndType('Checkbox'))
  })

  it('type=object is JsonSchemaForm', () => {
    const component = getComponent({ type: 'object' } as ISchema)

    expect(component).toEqual(getComponentByNameAndType('JsonSchemaForm'))
  })

  it('enum is Select', () => {
    const component = getComponent({ enum: [1, 2, 3] } as any)

    expect(component).toEqual(getComponentByNameAndType('Select'))
  })

  it('array is special inner component', () => {
    const component = getComponent({ type: 'array' } as ISchema)

    expect(component).toEqual(getComponentByNameAndType('JsonSchemaArray'))
  })

  it('when component is not found, string input is used', () => {
    const component = getComponent({ type: 'kekh' } as any)

    expect(component).toEqual({ componentName: 'TextInput', eventName: 'input' })
  })
})
