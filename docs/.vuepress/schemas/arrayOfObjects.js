export default {
  type: 'object',
  properties: {
    array: {
      type: 'array',
      title: 'Users',
      items: {
        type: 'object',
        properties: { name: { type: 'string', title: 'Username' } }
      }
    }
  }
}
