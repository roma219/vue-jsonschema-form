export default {
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
}
