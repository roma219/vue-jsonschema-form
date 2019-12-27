import { mergeDeep } from '../mergeDeep'

describe('mergeDeep utility function', () => {
  it('merges objects correctly', () => {
    expect(mergeDeep({ a: 1, c: { d: 1, t: 7 } }, { b: 2, c: { e: 5 } })).toEqual({ a: 1, b: 2, c: { d: 1, e: 5, t: 7 } })
    expect(mergeDeep({ a: 1, c: { d: 1 } }, { b: 2, c: 6, f: { g: 9 } })).toEqual({ a: 1, b: 2, c: 6, f: { g: 9 } })
    expect(mergeDeep({ a: 1 }, { a: { f: 3 } })).toEqual({ a: 1 })
  })
})
