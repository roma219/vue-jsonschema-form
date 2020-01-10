export default testSchema = {
  type: 'object',
  properties: {
    a: { type: 'string', title: 'Text Input', minLength: 1, maxLength: 5 },
    b: { type: 'number', maximum: 10 },
    c: { type: 'boolean', default: true }
  }
}
