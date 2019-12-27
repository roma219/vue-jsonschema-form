import { processSchema } from '../processSchema'

describe('processSchema utility function', () => {
  it('processes schema', () => {
    const value = processSchema({
      type: 'object',
      properties: {
        a: { type: 'null' },
        b: { type: 'number', default: 123 },
        c: { type: 'object', properties: { d: {type: 'string', default: 'a' } } },
        e: { type: 'object' },
        f: { type: 'array', items: { type: 'string'} }
      },
      kek: 5
    } as any)

    expect(value).toEqual({
      type: 'object',
      properties: {
        a: { type: 'string' },
        b: { type: 'number', default: 123 },
        c: { type: 'object', properties: { d: {type: 'string', default: 'a' } } },
        e: { type: 'object' },
        f: { type: 'array', items: { type: 'string'} }
      },
      kek: 5
    })
  })
})
