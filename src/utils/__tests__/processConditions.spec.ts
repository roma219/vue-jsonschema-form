import { processSchemaConditions, checkRequierment } from '../processConditions'
import { testSchemaWithConditions, processedTestSchemaWithConditions } from '../__testData__'
import { ISchema, ISchemaObject } from '@/types'

const testData = {
  text: '',
  number: null,
  float: null,
  checkbox: true,
  arr: [],
  nested: {
    test2: 'lalala',
    nested2: {
      arrOfObjects: [{
        aaa: '',
        bbb: 5
      }],
      zog: null
    }
  }
}

describe('[JSON-SCHEMA] processConditions helper function', () => {
  // it('correctly processes conditions data from schema', () => {
  //   const newSchema = processSchemaConditions(testSchemaWithCondition as ISchemaObject, testData)

  //   expect(newSchema).toEqual(processedTestSchemaWithConditions)
  // })
})

describe('[JSON-SCHEMA] checkRequierment function', () => {
  it('checks "const" condition', () => {
    const testRequirment = { properties: { a: { const: 5 } } }

    expect(checkRequierment(testRequirment, { a: 5 })).toBe(true)
    expect(checkRequierment(testRequirment, { a: 123 })).toBe(false)
  })
  it('checks "minLength" condition', () => {
    const testRequirment = { properties: { a: { minLength: 1 } } }

    expect(checkRequierment(testRequirment, { a: '' })).toBe(false)
    expect(checkRequierment(testRequirment, { a: 'asd' })).toBe(true)
    expect(checkRequierment(testRequirment, { a: [] })).toBe(false)
    expect(checkRequierment(testRequirment, { a: [1] })).toBe(true)
  })
  it('detects "not" condition', () => {
    const testRequirment = { not: { properties: { a: { const: 5 } } } }

    expect(checkRequierment(testRequirment, { a: 5 })).toBe(false)
    expect(checkRequierment(testRequirment, { a: 123 })).toBe(true)
  })

  it('detects "not" + "minLength" condition', () => {
    const testRequirment = { not: { properties: { a: { minLength: 5 } } } }

    expect(checkRequierment(testRequirment, { a: 'aaaaaa' })).toBe(false)
    expect(checkRequierment(testRequirment, {})).toBe(true)

  })

  it('detects invalid condition', () => {
    console.warn = jest.fn()

    const testRequirment = { not: { properties: { b: { asdasd: 5 } } } }

    expect(checkRequierment(testRequirment, { a: 5 })).toBe(false)
    expect(checkRequierment({ properties: 5}, { a: 5 })).toBe(false)
    expect(console.warn).toHaveBeenCalledWith('[JSON-SCHEMA] Invalid IF condition: ', testRequirment)
  })
  it('Not validates unsupported condition', () => {
    const testRequirment = { not: { properties: { a: { maximum: 5 } } } }

    expect(checkRequierment(testRequirment, { a: 5 })).toBe(false)
  })

  it('Handles empty second parameter', () => {
    const testRequirment = { not: { properties: { a: { maximum: 5 } } } }

    expect(checkRequierment(testRequirment)).toBe(false)
  })
})

describe('[JSON-SCHEMA] processSchemaConditions function', () => {
  it('processes IF condition', () => {
    const testSchema = {
      type: 'object',
      properties: {
        a: { type: 'string' }
      },
      if: { properties: { a: { minLength: 1 } } },
      then: { properties: { b: { type: 'integer' } } }
    }
    const processedContionSchema = {
      type: 'object',
      properties: {
        a: { type: 'string' },
        b: { type: 'integer' }
      },
      if: { properties: { a: { minLength: 1 } } },
      then: { properties: { b: { type: 'integer' } } }
    }

    expect(processSchemaConditions((testSchema as ISchemaObject), { a: '' })).toEqual(testSchema)
    expect(processSchemaConditions((testSchema as ISchemaObject), { a: 'qwe' })).toEqual(processedContionSchema)
  })

  it('processes several conditions via "allOf" condition', () => {
    const testCondition = {
      allOf: [{
        if: { properties: { a: { minLength: 1 } } },
        then: { properties: { b: { type: 'integer' } } }
      }, {
        if: { properties: { a: { const: '234' } } },
        then: { properties: { c: { type: 'boolean' } } }
      }]
    }

    const testSchema : ISchemaObject = {
      type: 'object',
      properties: {
        a: { type: 'string' }
      },
      ...testCondition
    }

    expect(processSchemaConditions(testSchema, { a: '' })).toEqual(testSchema)
    expect(processSchemaConditions(testSchema, { a: 'a' })).toEqual({
      type: 'object',
      properties: {
        a: { type: 'string' },
        b: { type: 'integer' }
      },
      ...testCondition
    })
    expect(processSchemaConditions(testSchema, { a: '234' })).toEqual({
      type: "object",
      properties: {
        a: { type: 'string' },
        b: { type: 'integer' },
        c: { type: 'boolean' }
      },
      ...testCondition
    })
  })

  it('processes if.allOf conditions', () => {
    const testCondition = {
      if: {
        allOf: [{
          properties: { a: { minLength: 1 } }
        }, {
          properties: { a: { const: '234' } }
        }]
      },
      then: { properties: { b: { type: 'integer' } } }
    }

    const testSchema : ISchemaObject = {
      type: 'object',
      properties: {
        a: { type: 'string' }
      },
      ...testCondition
    }

    expect(processSchemaConditions(testSchema, { a: '' })).toEqual(testSchema)
    expect(processSchemaConditions(testSchema, { a: 'a' })).toEqual(testSchema)
    expect(processSchemaConditions(testSchema, { a: '234' })).toEqual({
      type: 'object',
      properties: {
        a: { type: 'string' },
        b: { type: 'integer' }
      },
      ...testCondition
    })
  })

  it('processes if.oneOf conditions', () => {
    const testCondition = {
      if: {
        oneOf: [{
          properties: { a: { const: '777' } }
        }, {
          properties: { a: { const: '234' } }
        }]
      },
      then: { properties: { b: { type: 'integer' } } }
    }

    const getTestSchema = () : ISchema => ({
      type: 'object',
      properties: {
        a: { type: 'string' }
      },
      ...testCondition
    })

    expect(processSchemaConditions(getTestSchema(), { a: '' })).toEqual(getTestSchema())
    expect(processSchemaConditions(getTestSchema(), { a: 'a' })).toEqual(getTestSchema())
    expect(processSchemaConditions(getTestSchema(), { a: '777' })).toEqual({
      type: 'object',
      properties: {
        a: { type: 'string' },
        b: { type: 'integer' }
      },
      ...testCondition
    })
    expect(processSchemaConditions(getTestSchema(), { a: '234' })).toEqual({
      type: 'object',
      properties: {
        a: { type: 'string' },
        b: { type: 'integer' }
      },
      ...testCondition
    })
  })

  it('processes nested conditions', () => {
    const testSchema : ISchemaObject = {
      type: 'object',
      properties: {
        a: { type: 'string' },
        eee: {
          type: 'object',
          properties: {
            x: { type: 'boolean' }
          },
          if: { properties: { x: { const: true } } },
          then: { properties: { y: { type: 'integer' } } }
        },
        ddd: {
          type: 'object',
          properties: {
            z: { type: 'number' }
          }
        }
      },
      if: { properties: { eee: { properties: { x: { const: true } } } } },
      then: { properties: { ddd: { properties: { rr: { type: 'integer' } } } } }
    }

    expect(processSchemaConditions(testSchema, { a: '', eee: { x: false } })).toEqual(testSchema)
    expect(processSchemaConditions(testSchema, { a: '', eee: { x: true } })).toEqual({
      type: 'object',
      properties: {
        a: { type: 'string' },
        eee: {
          type: 'object',
          properties: {
            x: { type: 'boolean' },
            y: { type: 'integer' }
          },
          if: { properties: { x: { const: true } } },
          then: { properties: { y: { type: 'integer' } } }
        },
        ddd: {
          type: 'object',
          properties: {
            z: { type: 'number' },
            rr: { type: 'integer' }
          }
        }
      },
      if: { properties: { eee: { properties: { x: { const: true } } } } },
      then: { properties: { ddd: { properties: { rr: { type: 'integer' } } } } }
    })
  })
})
