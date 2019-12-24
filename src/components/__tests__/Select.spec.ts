import Select from '../Select.vue'
import { mount } from '@vue/test-utils'

describe('Select component', () => {
  it('should be vue component', () => {
    const wrapper = mount(Select)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('emits event on input', () => {
    const wrapper = mount(Select, { propsData: { options: ['1', '2', '3'], value: '2' }})
    ;(wrapper.vm.$el as any).value = '3'
    wrapper.trigger('input')
    expect(wrapper.emitted().input[0]).toEqual(['3'])
  })
})
