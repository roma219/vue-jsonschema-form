import Radio from '../Radio.vue'
import { mount } from '@vue/test-utils'

describe('Radio component', () => {
  it('should be vue component', () => {
    const wrapper = mount(Radio)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
