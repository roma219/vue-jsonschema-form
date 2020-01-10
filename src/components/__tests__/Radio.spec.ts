import Radio from '../Radio.vue'
import { mount } from '@vue/test-utils'

describe('Radio component', () => {
  it('should be vue component', () => {
    const wrapper = mount(Radio)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should emit input event on change', () => {
    const wrapper = mount(Radio, { propsData: { options: ['1', '2', '3'], value: '2' } })
    var event = new Event('input', {
      bubbles: true,
      cancelable: true
    })
    wrapper.vm.$el.getElementsByTagName('input')[0].dispatchEvent(event)
    expect(wrapper.emitted().input[0]).toEqual(['1'])
  })
})
