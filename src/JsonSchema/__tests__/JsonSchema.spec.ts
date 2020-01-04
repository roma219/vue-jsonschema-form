import JsonSchema from '../JsonSchema.vue'
import { mount } from '@vue/test-utils'

const testSchema = {
  type: 'object',
  properties: {
    b: {
      type: 'object',
      properties: {
        c: { type: 'string'}
      }
    },
    c: { type: 'string', enum: ['1', '2', '3'] },
    d: { type: 'array', items: { type: 'number' } },
    e: { type: 'array', items: { type: 'object', properties: { f: { type: 'string', default: 'kek' }} } },
  }
}

describe('JsonSchema.vue', () => {
  it('should be a vue component', () => {
    const wrapper = mount(JsonSchema, { propsData: { schema: testSchema } })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('emits updated data on change', () => {
    const wrapper = mount(JsonSchema, { propsData: { schema: testSchema, value: {} } })
    const input = wrapper.find('input')
    ;(input.element as any).value = 'aaa'
    input.trigger('input')
    expect(wrapper.emitted().input[0]).toEqual([{ b: { c: 'aaa' } }])
  })
})
