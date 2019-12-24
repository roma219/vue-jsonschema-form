import Checkbox from '../Checkbox.vue'
import { mount } from '@vue/test-utils'

describe('Checkbox component', () => {
  it('should be vue component', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('emits event on input', () => {
    const wrapper = mount(Checkbox)
    ;(wrapper.vm.$el as any).value = true
    wrapper.trigger('input')
    expect(wrapper.emitted().input[0]).toEqual([false])
  })
})
