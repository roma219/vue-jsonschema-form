export default {
  type: 'object',
  properties: {
    a: { type: 'string', title: 'Username' },
    b: {
      type: 'object',
      title: '',
      properties: {
        c: { type: 'boolean', title: 'Is Admin' }
      }
    }
  }
}
