export default {
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
}
