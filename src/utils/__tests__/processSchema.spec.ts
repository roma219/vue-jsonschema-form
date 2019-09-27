import { processSchema } from '../processSchema'
import { JSONSchema7 } from 'json-schema'
import { ISchema, IUiSchema } from '@/types'

import config from '@/utils/config'

const schema : JSONSchema7 = {
  type: 'object',
  properties: {
    aaa: { type: 'string', minLength: 1 },
    bbb: { type: 'boolean' },
    ccc: { type: 'string', enum: ['1', '2', '3'] },
    ddd: {
      type: 'object',
      title: '',
      properties: {
        a1: { type: 'string', minLength: 1, maxLength: 5 },
        b2: { type: 'boolean' },
        ddd: {
          type: 'object',
          properties: {
            a1: { type: 'string' },
            b2: { type: 'boolean' }
          }
        }
      }
    }
  }
}

const testResultSchema = {
  componentName: 'JsonSchemaForm',
  eventName: 'input',
  properties: {
    aaa: {
      componentName: 'TextInput',
      eventName: 'input',
      minLength: 1,
      props: undefined,
      type: 'string',
    },
    bbb: {
      componentName: 'Checkbox',
      eventName: 'input',
      props: undefined,
      type: 'boolean',
    },
    ccc: {
      componentName: 'Select',
      enum: ['1', '2', '3'],
      eventName: 'input',
      props: (schema: ISchema, uiSchema: IUiSchema) => ({ options: schema.enum }),
      type: 'string',
    },
    ddd: {
      componentName: 'JsonSchemaForm',
      eventName: 'input',
      properties: {
        a1: {
          componentName: 'TextInput',
          eventName: 'input',
          maxLength: 5,
          minLength: 1,
          props: undefined,
          type: 'string',
        },
        b2: {
          componentName: 'Checkbox',
          eventName: 'input',
          props: undefined,
          type: 'boolean',
        },
        ddd: {
          componentName: 'JsonSchemaForm',
          eventName: 'input',
          properties: {
            a1: {
              componentName: 'TextInput',
              eventName: 'input',
              props: undefined,
              type: 'string',
            },
            b2: {
              componentName: 'Checkbox',
              eventName: 'input',
              props: undefined,
              type: 'boolean',
            },
          },
          props: undefined,
          type: 'object',
        },
      },
      props: undefined,
      title: '',
      type: 'object',
    },
  },
  props: undefined,
  type: 'object',
}

describe('processSchema utility function', () => {
  it('Simple schema', () => {
    const processedSchema = JSON.parse(JSON.stringify(processSchema(schema)))

    expect(processedSchema).toEqual(JSON.parse(JSON.stringify(testResultSchema)))
  })
})

