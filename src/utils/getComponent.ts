import { IComponent, ISchema, IUiSchema, IAnyObject, ComponentsConfig, IConfigComponent } from '@/types'
import { defaultComponents } from './defaultComponents'

const isMatch = (target : IAnyObject, source : IAnyObject) : boolean => {
  return Object.entries(source).every(([propName, value]) => value === target[propName])
}

function areEqual (obj1: IAnyObject, obj2: IAnyObject) : boolean {
  return Object.keys(obj1).every(key => {
    return obj2.hasOwnProperty(key) ? typeof obj1[key] === 'object' ? areEqual(obj1[key], obj2[key]) : obj1[key] === obj2[key] : false
  })
}

const canReplaceComponents = (componentA: IConfigComponent, componentB: IConfigComponent) => {
  return (componentA.matcher && areEqual(componentA.matcher, componentB.matcher || {})) ||
    (componentA.uiSchemaMatcher && areEqual(componentA.uiSchemaMatcher, componentB.uiSchemaMatcher || {})) ||
    (componentA.contains && componentA.contains === componentB.contains)
}

export const mergeComponents = (customComponents: ComponentsConfig) => {
  const components = [ ...defaultComponents ]
  const filteredCustomComponents = customComponents.filter(component => {
    if (component.matcher || component.uiSchemaMatcher || component.contains) {
      const index = defaultComponents.findIndex(defaultComponent => canReplaceComponents(defaultComponent, component))
      if (index > -1) {
        components[index] = component
        return false
      }
      return true
    }
  })
  return [...filteredCustomComponents, ...components]
}

export const getComponent = (schema: ISchema, components: ComponentsConfig = defaultComponents, uiSchema?: IUiSchema) : IComponent => {
  const component = components.find(component => {
    if (component.matcher) return isMatch(schema, component.matcher)
    if (component.uiSchemaMatcher) return isMatch(uiSchema || {}, component.uiSchemaMatcher)
    if (component.contains) return schema.hasOwnProperty(component.contains)
  })

  const { componentName = 'TextInput', eventName = 'input', props = undefined } = (component || {})

  return { componentName, eventName, props }
}
