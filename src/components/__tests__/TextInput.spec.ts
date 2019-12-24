import TextInput from '../TextInput.vue'
import { mount } from '@vue/test-utils'

describe('TextInput component', () => {
  it('should be vue component', () => {
    const wrapper = mount(TextInput)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should correctly compute its type', () => {
    const wrapper = mount(TextInput, { propsData: { type: 'number' }})
    expect((wrapper.vm as any).isNumber).toBe(true)
    expect((wrapper.vm as any).isFloat).toBe(false)

    wrapper.setProps({ type: 'float' })
    expect((wrapper.vm as any).isNumber).toBe(true)
    expect((wrapper.vm as any).isFloat).toBe(true)

    wrapper.setProps({ type: 'qwert' })
    expect((wrapper.vm as any).isNumber).toBe(false)
    expect((wrapper.vm as any).isFloat).toBe(false)
  })

  it('emits event on input', () => {
    const wrapper = mount(TextInput)
    ;(wrapper.vm.$el as any).value = '123'
    wrapper.trigger('input')
    expect(wrapper.emitted().input[0]).toEqual(['123'])
  })
})
