export default {
  home: {
    type: 'object',
    properties: {
      a: { type: 'string', title: 'Name', minLength: 1 },
      b: { type: 'number', title: 'Age', maximum: 99 },
      c: { type: 'boolean', title: 'Agree' }
    }
  },
  basic: {
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
  },
  nested: {
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
  },
  arrayOfObjects: {
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
  },
  conditions: {
    type: 'object',
    properties: {
      a: { type: 'string', title: 'Your favourite front-end framework?' },
      b: { type: 'number', title: 'Amount of likes' }
    },
    if: {
      properties: {
        a: {
          const: 'Vue'
        }
      }
    },
    then: {
      properties: {
        b: {
          minimum: 1
        },
        c: { type: 'boolean', title: 'Are you sure?' }
      }
    }
  },
  conditionsOneOf: {
    type: 'object',
    properties: {
      a: { type: 'string', title: 'Your favourite front-end framework?' },
      b: { type: 'number', title: 'Amount of likes' }
    },
    if: {
      oneOf: [{
        properties: {
          a: {
            const: 'Vue'
          }
        }
      }, {
        properties: {
          a: {
            const: 'React'
          }
        }
      }
      ]
    },
    then: {
      properties: {
        b: {
          minimum: 1
        },
        c: { type: 'boolean', title: 'Are you sure?' }
      }
    }
  },
  conditionsAllOf: {
    type: 'object',
    properties: {
      a: { type: 'string', title: 'Your favourite front-end framework?' },
      b: { type: 'number', title: 'Amount of likes' },
      c: { type: 'boolean', title: 'Are you sure?' }
    },
    if: {
      allOf: [{
        properties: {
          a: {
            const: 'Vue'
          }
        }
      }, {
        properties: {
          c: {
            const: true
          }
        }
      }]
    },
    then: {
      properties: {
        x: {
          type: 'string', title: 'Field'
        }
      }
    }
  },
  conditionsAllOfSeveral: {
    type: 'object',
    properties: {
      a: { type: 'string', title: 'Your favourite front-end framework?' },
      b: { type: 'number', title: 'Amount of likes' },
      c: { type: 'boolean', title: 'Are you sure?' }
    },
    allOf: [{
      if: {
        properties: {
          a: {
            const: 'Vue'
          }
        }
      },
      then: {
        properties: {
          x: {
            type: 'string', title: 'Field'
          }
        }
      }
    }, {
      if: {
        properties: {
          a: {
            const: 'React'
          }
        }
      },
      then: {
        properties: {
          y: {
            type: 'boolean', title: 'Another'
          }
        }
      }
    }]
  },
  defaults: {
    type: 'object',
    properties: {
      a: { title: 'User Provider', type: 'string', default: 'Fabric №1' },
      b: { type: 'boolean', title: 'Yes?' }
    }
  },
  radio: {
    type: 'object',
    properties: {
      a: {
        type: 'string',
        title: 'User Type',
        enum: ['User', 'Editor', 'Admin']
      }
    }
  },
  order: {
    type: 'object',
    properties: {
      a: { type: 'string', title: 'Name' },
      b: { type: 'boolean', title: 'Superuser' },
      c: { type: 'string', title: 'Surname' }
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
