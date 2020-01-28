{
  componentName: 'CustomWrapper',
  props: (propName, schema, uiSchema) => ({
    title: schema.title || propName
  })
}
