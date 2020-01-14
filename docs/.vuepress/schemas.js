export default {
  home: {
    type: 'object',
    properties: {
      a: { type: 'string', title: 'Text Input', minLength: 1, maxLength: 5 },
      b: { type: 'number', maximum: 10 },
      c: { type: 'boolean' }
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
        title: '',
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
  },
  conditions: {
    type: 'object',
    properties: {
      a: { type: 'string' },
      b: { type: 'number' }
    },
    if: {
      properties: {
        a: {
          const: 'aaa'
        }
      }
    },
    then: {
      properties: {
        b: {
          minimum: 1
        },
        c: { type: 'boolean' }
      }
    }
  },
  defaults: {
    type: 'object',
    properties: {
      a: { type: 'string', default: 'aaa' },
      b: { type: 'boolean' }
    }
  },
  radio: {
    type: 'object',
    properties: {
      a: {
        type: 'string',
        enum: ['option 1', 'option 2', 'option 3']
      }
    }
  },
  order: {
    type: 'object',
    properties: {
      a: { type: 'string' },
      b: { type: 'boolean' },
      c: { type: 'string' }
    }
  },
  selectTitles: {
    type: 'object',
    properties: {
      a: {
        type: 'string',
        enum: ['option 1', 'option 2', 'option 3']
      }
    }
  }
}
