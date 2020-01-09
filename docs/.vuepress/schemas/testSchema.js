export default testSchema = {
  type: 'object',
  properties: {
    aaa: { type: 'number', maximum: 10 },
    arr: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          a: { type: 'string', minLength: 2 },
          b: { type: 'boolean' }
        }
      }
    },
    bbb: { type: 'boolean' },
    ccc: { type: 'string', enum: ['1', '2', '3'] },
    ddd: {
      type: 'object',
      title: '',
      properties: {
        a1: { type: 'string', minLength: 1, maxLength: 5 },
        b2: { type: 'boolean', default: true },
        ddd: {
          type: 'object',
          properties: {
            a1: { type: 'string', default: 'aaa' },
            b2: { type: 'boolean' }
          }
        }
      }
    }
  },
  if: {
    properties: {
      aaa: {
        const: 10
      }
    }
  },
  then: {
    properties: {
      newField: { type: 'string' }
    }
  }
}
