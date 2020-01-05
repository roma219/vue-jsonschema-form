export const testSchemaForDefaultData = {
  type: 'object',
  properties: {
    text: { type: 'string' },
    number: { $ref: '#/definitions/numberDef', type: 'integer' },
    float: { type: 'number' },
    checkbox: { type: 'boolean' },
    arr: { type: 'array', items: { type: 'string' } },
    nested: {
      type: 'object',
      properties: {
        test2: { type: 'string', default: 'lalala' },
        nested2: {
          type: 'object',
          properties: {
            arrOfObjects: {
              type: 'array',
              items: {
                $ref: '#/definitions/itemsRef',
                __collapsible__: true,
                type: 'object',
                properties: {
                  aaa: { type: 'string' },
                  bbb: { type: 'integer', default: 5 }
                }
              }
            },
            zog: { type: 'zog' }
          }
        }
      }
    }
  }
}

export const testSchemaWithRefs = {
  type: 'object',
  definitions: {
    numberDef: {
      type: 'integer'
    },
    itemsRef: {
      type: 'object',
      properties: {
        aaa: { type: 'string' },
        bbb: { type: 'integer', default: 5 }
      }
    }
  },
  properties: {
    text: { type: 'string' },
    number: { $ref: '#/definitions/numberDef' },
    float: { type: 'number' },
    checkbox: { type: 'boolean' },
    arr: { type: 'array', items: { type: 'string' } },
    nested: {
      type: 'object',
      properties: {
        test2: { type: 'string', default: 'lalala' },
        nested2: {
          type: 'object',
          properties: {
            arrOfObjects: {
              type: 'array',
              items: {
                $ref: '#/definitions/itemsRef'
              }
            },
            zog: { type: 'zog' }
          }
        }
      }
    }
  }
}

export const testSchemaWithConditions = {
  type: 'object',
  properties: {
    text: { type: 'string' },
    number: { type: 'integer' },
    float: { type: 'number' },
    checkbox: { type: 'boolean' },
    arr: { type: 'array', items: { type: 'string' } },
    nested: {
      type: 'object',
      properties: {
        test2: { type: 'string', default: 'lalala' },
        nested2: {
          type: 'object',
          properties: {
            arrOfObjects: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  aaa: { type: 'string' },
                  bbb: { type: 'integer', default: 5 }
                }
              }
            },
            zog: { type: 'zog' }
          }
        }
      }
    }
  },
  if: { properties: { checkbox: { const: true } } },
  then: { properties: { newField: { type: 'string' } } }
}

export const processedTestSchemaWithConditions = {
  type: 'object',
  properties: {
    text: { type: 'string' },
    number: { type: 'integer' },
    float: { type: 'number' },
    checkbox: { type: 'boolean' },
    arr: { type: 'array', items: { type: 'string' } },
    newField: { type: 'string' },
    nested: {
      type: 'object',
      properties: {
        test2: { type: 'string', default: 'lalala' },
        nested2: {
          type: 'object',
          properties: {
            arrOfObjects: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  aaa: { type: 'string' },
                  bbb: { type: 'integer', default: 5 }
                }
              }
            },
            zog: { type: 'zog' }
          }
        }
      }
    }
  },
  if: { properties: { checkbox: { const: true } } },
  then: { properties: { newField: { type: 'string' } } }
}

export const schemaWithValidations = {
  type: 'object',
  properties: {
    text: { type: 'string', minLength: 1 },
    number: { $ref: '#/definitions/numberDef', type: 'integer', minimum: 1 },
    float: { type: 'number', minimum: 3 },
    checkbox: { type: 'boolean' },
    arr: { type: 'array', minLength: 1, items: { type: 'string' } },
    nested: {
      type: 'object',
      properties: {
        test2: { type: 'string', default: 'lalala', maxLength: 10 },
        nested2: {
          type: 'object',
          properties: {
            arrOfObjects: {
              type: 'array',
              items: {
                $ref: '#/definitions/itemsRef',
                type: 'object',
                properties: {
                  aaa: { type: 'string', minLength: 2 },
                  bbb: { type: 'integer', default: 5, maximum: 10 }
                }
              }
            },
            zog: { type: 'zog' }
          }
        }
      }
    }
  }
}
