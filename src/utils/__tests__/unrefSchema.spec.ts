import { unrefSchema } from '../unrefSchema'

describe('unrefSchema utility function', () => {
  it('handles empty definitions', () => {
    const value = unrefSchema({
      type: 'object',
      properties: {
        a: { type: 'string' }
      },
    } as any)

    expect(value).toEqual({
      type: 'object',
      properties: {
        a: { type: 'string' },
      }
    })
  })

  it('uses definitions', () => {
    console.warn = jest.fn()

    const value = unrefSchema({
      definitions: {
        a: { type: 'string', title: 'myref' },
        itemSchema: { type: 'number' }
      },
      type: 'object',
      properties: {
        a: { $ref: '#/definitions/a' },
        b: { type: 'array', items: { $ref: '#/definitions/itemSchema' } },
        b2: { type: 'array', items: { type: 'string' } },
        c: { type: 'object', properties: { d: { $ref: '#/definitions/a' } } },
        x: { $ref: '#/definitions/x' }
      },
      if: { properties: { a: { const: 5 } } },
      then: { properties: { z: { $ref: '#/definitions/a' } } },
      allOf: [{
        if: { properties: { a: { const: 5 } } },
        then: { properties: { z: { $ref: '#/definitions/a' } } }
      }, {
        if: { properties: { a: { const: 5 } } },
        then: { properties: { z: { minLength: 7 } } }
      }, {
        if: { properties: { a: { const: 5 } } },
        then: { z: { minLength: 7 } }
      }]
    } as any)

    expect(value).toEqual({
      type: 'object',
      properties: {
        a: { $ref: '#/definitions/a', type: 'string', title: 'myref' },
        b: { type: 'array', items: { $ref: '#/definitions/itemSchema', type: 'number' } },
        b2: { type: 'array', items: { type: 'string' } },
        c: { type: 'object', properties: { d: { $ref: '#/definitions/a', type: 'string', title: 'myref' } } },
        x: { $ref: '#/definitions/x', type: 'string' }
      },
      if: { properties: { a: { const: 5 } } },
      then: { properties: { z: { $ref: '#/definitions/a', type: 'string', title: 'myref' } } },
      allOf: [{
        if: { properties: { a: { const: 5 } } },
        then: { properties: { z: { $ref: '#/definitions/a', type: 'string', title: 'myref'} } }
      }, {
        if: { properties: { a: { const: 5 } } },
        then: { properties: { z: { minLength: 7 } } }
      }, {
        if: { properties: { a: { const: 5 } } },
        then: { z: { minLength: 7 } }
      }]
    })
    expect(console.warn).toHaveBeenCalledWith('[JSON-SCHEMA] Ref="#/definitions/x" not found in definitions')
  })

})
