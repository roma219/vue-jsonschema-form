export default {
  type: 'object',
  properties: {
    a: { type: 'string', title: 'Name', minLength: 1 },
    b: { type: 'number', title: 'Age', maximum: 99 },
    c: { type: 'boolean', title: 'Agree' }
  }
}
