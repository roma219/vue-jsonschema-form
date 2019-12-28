import JsonSchema from '../JsonSchema.vue'
import { mount } from '@vue/test-utils'

const testSchema = {
  type: 'object',
  properties: {
    a: { type: 'string' }
  }
}

describe('JsonSchema.vue', () => {
  it('should be a vue component', () => {
    const wrapper = mount(JsonSchema, { propsData: { schema: testSchema } })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
