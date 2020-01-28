export default {
  type: 'object',
  properties: {
    a: {
      type: 'string',
      title: 'User Type',
      enum: ['User', 'Editor', 'Admin']
    }
  }
}
