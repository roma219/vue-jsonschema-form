export default {
  type: 'object',
  properties: {
    a: { type: 'string', title: 'Username' },
    b: { type: 'boolean', title: 'Use Avatar' },
    mySelect: {
      type: 'string',
      title: 'Account Type',
      enum: ['User', 'Editor', 'Admin']
    }
  }
}
