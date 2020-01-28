[{
  componentName: 'VSelect',
  contains: 'enum',
  props: (propName, schema, uiSchema) => ({
    label: schema.title || propName,
    items: schema.enum,
    outlined: true
  }),
  eventName: 'change'
}, {
  componentName: 'VSwitch',
  matcher: { type: 'boolean' },
  eventName: 'change',
  props: (propName, schema, uiSchema) => ({
    label: schema.title || propName
  })
},{
  componentName: 'VTextField',
  matcher: { type: 'string' },
  props: (propName, schema, uiSchema) => ({
    label: schema.title || propName,
    outlined: true,
    clearable: true,
    hint: schema.description,
    'persistent-hint': true
  })
}, {
  componentName: 'VDatePicker',
  uiSchemaMatcher: { uiType: 'datepicker' },
  eventName: 'change',
  props: (propName, schema, uiSchema) => ({
    'full-width': true
  })
}]
