export default {
  inputWrapper: {
    name: 'InputWrapper',
    props: (propName: string, schema: any, uiSchema = {}) => ({
      title: schema.title || propName
    })
  }
}
