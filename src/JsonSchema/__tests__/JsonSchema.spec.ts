import JsonSchema from '../JsonSchema.vue'
import { mount } from '@vue/test-utils'

const testSchema = {
  type: 'object',
  properties: {
    b: {
      type: 'object',
      properties: {
        c: { type: 'string', minLength: 1 }
      }
    },
    c: { type: 'string', enum: ['1', '2', '3'] },
    e: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          f: {
            type: 'string',
            default: 'kek'
          }
        }
      }
    }
  }
}

const testUiSchema = {
  properties: {
    c: {
      uiType: 'radio',
      order: 2
    },
    d: {
      order: 1
    },
    e: {
      order: 5
    }
  }
}

describe('JsonSchema.vue', () => {
  it('should be a vue component', () => {
    const wrapper = mount(JsonSchema, { propsData: { schema: testSchema, uiSchema: testUiSchema } })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('emits updated data on change', () => {
    const wrapper = mount(JsonSchema, { propsData: { schema: testSchema, value: { b: {} } } })
    const input = wrapper.find('input')
    ;(input.element as any).value = 'aaa'
    input.trigger('input')
    expect(wrapper.emitted().input[0]).toEqual([{ b: { c: 'aaa' }, c: '1' }])
  })
  it('creates empty object when inner property was changed', () => {
    const wrapper = mount(JsonSchema, { propsData: { schema: testSchema, value: { } } })
    const input = wrapper.find('input')
    ;(input.element as any).value = 'aaa'
    input.trigger('input')
    expect(wrapper.emitted().input[0]).toEqual([{ c: '1' }])
  })
  it('correctly handles array element change', () => {
    const wrapper = mount(JsonSchema, { propsData: { schema: testSchema, value: { e: [{ f: 'aaa' }, { f: 'bbb' }] } } })
    const moveBtn = wrapper.find('button')
    moveBtn.trigger('click')
    expect(wrapper.emitted().input[0]).toEqual([ { c: '1', e: [{ f: 'aaa' }, { f: 'bbb' }] } ])
    const deleteBtn = wrapper.findAll('button').at(1)
    deleteBtn.trigger('click')
    expect(wrapper.emitted().input[1]).toEqual([ { e: [{ f: 'bbb' }, { f: 'aaa' }] } ])
    const addBtn = wrapper.find('.add-new-arr-item')
    addBtn.trigger('click')
    expect(wrapper.emitted().input[2]).toEqual([ { e: [{ f: 'bbb' }] } ])
  })
})
