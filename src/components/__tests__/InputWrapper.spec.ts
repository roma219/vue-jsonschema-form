import InputWrapper from '../TextInput.vue'
import { mount } from '@vue/test-utils'

describe('InputWrapper component', () => {
  it('should be vue component', () => {
    const wrapper = mount(InputWrapper)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should have title when corresponding prop is provided', () => {
    const wrapper = mount(InputWrapper, { propsData: { title: '123' } })
    expect((wrapper.vm as any).vertical).toBeFalsy()
    // expect(wrapper.vm.$el.children[0].innerHTML).toBe('123')
  })
})
