export default {
  home: {
    type: 'object',
    properties: {
      a: { type: 'string', title: 'Text Input', minLength: 1, maxLength: 5 },
      b: { type: 'number', maximum: 10 },
      c: { type: 'boolean', default: true }
    }
  },
  basic: {
    type: 'object',
    properties: {
      a: { type: 'string' },
      b: { type: 'boolean' },
      mySelect: {
        type: 'string',
        enum: ['option1', 'option2', 'option3']
      }
    }
  },
  nested: {
    type: 'object',
    properties: {
      a: { type: 'string' },
      b: {
        type: 'object',
        properties: {
          c: { type: 'boolean' }
        }
      }
    }
  },
  arrayOfObjects: {
    type: 'object',
    properties: {
      array: {
        type: 'array',
        items: {
          type: 'object',
          properties: { name: { type: 'string' } }
        }
      }
    }
  }
}
