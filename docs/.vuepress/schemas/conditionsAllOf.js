export default {
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
}
